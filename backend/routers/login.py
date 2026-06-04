from datetime import timedelta
from fastapi import APIRouter, HTTPException
from models import UserSchema, LoginSchema
from repositories import UserRepository
from auth import autenticar_user, create_access_token, get_senha_hash
router = APIRouter(
    tags = ["login"]
)


@router.post("/login", status_code=200, )
def login_user(login: LoginSchema):
    user = autenticar_user(login.username, login.senha)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha inválidos"
        )
    
    access_token = create_access_token(
        {"sub": user.username},
        timedelta(minutes=30)
    )
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/cadastro", status_code=201)
def cadastro_user(user: UserSchema):
    user.senha = get_senha_hash(user.senha)
    UserRepository.cadastrar_user(user)
    return {"mensagem" : "Usuário cadastrado com sucesso!"}