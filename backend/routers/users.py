from fastapi import APIRouter,Depends, HTTPException
from auth import get_current_user, verifica_senha, get_senha_hash
from models import UserBase, PasswordSchema, PasswordUpdate
from repositories import UserRepository
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

@router.patch("/me/password", status_code=200)
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
