from fastapi import APIRouter,Depends, HTTPException
from auth import get_current_user, verifica_senha, get_senha_hash, get_current_admin
from models import UserBase, PasswordSchema, PasswordUpdate, UserCreate
from repositories import UserRepository

SENHA_EXEMPLO = "senha_exemplo"

router = APIRouter(

    tags= ["users"],
    prefix= "/users"
)

@router.get("/me", status_code=200)
def get_user(user = Depends(get_current_user)):
    user_response = UserBase(
        username= user.username,
        cpf= user.cpf,
        nome= user.nome
    )
    return user_response

@router.put("/me", status_code=200)
def put_user(user_update: UserBase, user= Depends(get_current_user)):
    user.nome = user_update.nome
    user.cpf = user_update.cpf
    user.username = user_update.username
    UserRepository.atualizar_user(user)

    return {"mensagem" : "Usuário atualizado com sucesso"}

@router.delete("/me", status_code=200)
def delete_user(password: PasswordSchema, user= Depends(get_current_user)):
    if password.senha != password.confirmar_senha:
        raise HTTPException(
        status_code=400,
        detail="As senhas não coincidem"
    )

    if not verifica_senha(password.senha, user.senha_hash):
        raise HTTPException(
            status_code=400,
            detail= "Senha inválida"
        )
    
    UserRepository.deletar_user_userid(user.id)
    return {"mensagem": "usuário removido com sucesso"}

@router.put("/me/password", status_code=200)
def update_password(password_data: PasswordUpdate,user=Depends(get_current_user)):
    if password_data.nova_senha != password_data.confirmar_nova_senha:
        raise HTTPException(
            status_code=400,
            detail="As novas senhas não coincidem"
        )

    if not verifica_senha(password_data.senha_atual, user.senha_hash):
        raise HTTPException(
            status_code=400,
            detail="Senha atual incorreta"
        )

    nova_hash = get_senha_hash(password_data.nova_senha)

    user.senha_hash = nova_hash
    UserRepository.atualizar_user(user)

    return {"mensagem": "Senha alterada com sucesso"}

@router.get("/", status_code=200)
def list_users(user_admin = Depends(get_current_admin)):
    users = UserRepository.listar_users()
    return [{
            "id": user.id,
            "username": user.username,
            "cpf": user.cpf,
            "nome": user.nome
        }
        for user in users
    ] 

@router.get("/{id}", status_code=200)
def get_user_by_admin(id:int, user_admin = Depends(get_current_admin)):
    user = UserRepository.buscar_user_userid(id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )
    return {
        "id" : user.id,
        "username": user.username,
        "cpf" : user.cpf,
        "nome": user.nome
    }

@router.post("/", status_code=201)
def create_user_by_admin(user_create: UserBase, user_amin = Depends(get_current_admin)):
    user = UserCreate(
        username= user_create.username,
        cpf= user_create.cpf,
        nome= user_create.nome,
        senha= SENHA_EXEMPLO
    )
    UserRepository.cadastrar_user_semAtivo(user)
    return {"mensagem" : "Usuário cadastrado com sucesso!"}


@router.put("/{id}", status_code=200)
def put_admin_user(id: int, user_update: UserBase, user_admin = Depends(get_current_admin)):
    user = UserRepository.buscar_user_userid(id)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Usuário não encontrado"
        )
    user.username = user_update.username
    user.nome = user_update.nome
    user.cpf = user_update.cpf
    UserRepository.atualizar_user(user)
    return {"Mensagem" : "Usuário atualizado"}

@router.delete("/{id}", status_code=200)
def delete_admin_user(id: int, user_admin = Depends(get_current_admin)):
    user = UserRepository.buscar_user_userid(id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )
    if user_admin.id == id:
        raise HTTPException(
            status_code=400,
            detail="Você não pode remover sua própria conta"
        )
    UserRepository.deletar_user_userid(id)
    return {"Mensagem" : "Usuário deletado com sucesso"}
    
