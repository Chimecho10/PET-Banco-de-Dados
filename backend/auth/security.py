from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import  Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash
from pydantic import BaseModel

from models import UserModel
from repositories import UserRepository

SECRET_KEY = "c20fda2665174b06b7fc8b8e53a9a068d89140246022e9191ed06972f993091f"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_hash = PasswordHash.recommended()

DUMMY_HASH = password_hash.hash("senha_exemplo")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None

def verifica_senha(senha_input, senha_hash) -> bool:
    return password_hash.verify(senha_input, senha_hash)


def get_senha_hash(senha):
    return password_hash.hash(senha)

def autenticar_user(username: str, password: str) -> UserModel | None:
    user = UserRepository.buscar_user_username(username)
    if not user:
        verifica_senha(password, DUMMY_HASH)
        return None
    
    if not user.ativo:
        return None

    if not verifica_senha(password, user.senha_hash):
        return None
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> UserModel:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = UserRepository.buscar_user_username(username=token_data.username)
    if user is None:
        raise credentials_exception
    
    if not user.ativo:
        raise credentials_exception

    return user