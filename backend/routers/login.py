from datetime import timedelta
from fastapi import APIRouter, HTTPException
from models import UserCreate, LoginSchema
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
def cadastro_user(user: UserCreate):

        user_existente = UserRepository.buscar_user_cpf(user.cpf)
        user_username = UserRepository.buscar_user_username(user.username)

        if user_existente:
            if user_existente.ativo:
                raise HTTPException(
                    status_code=409,
                    detail="Já existe um usuário com este CPF."
                )
            
            if user_username and user_username.id != user_existente.id:
                raise HTTPException(
                    status_code=409,
                    detail="Nome de usuário já está em uso."
                )

            user_existente.username = user.username
            user_existente.senha_hash = get_senha_hash(user.senha)

            UserRepository.ativar_user(user_existente)

            return {"mensagem": "Conta ativada com sucesso!"}

        if user_username:
            raise HTTPException(
                status_code=409,
                detail="Nome de usuário já está em uso."
            )
            
        user.senha = get_senha_hash(user.senha)
        UserRepository.cadastrar_user(user)

        return {"mensagem": "Usuário cadastrado com sucesso!"}
