from fastapi import APIRouter
from models import UserSchema
from repositories import UserRepository
router = APIRouter(
    tags=["login","cadastro"]
)

@router.post("/login", status_code=200)
def login_user():
    pass

@router.post("/cadastro", status_code=201)
def cadastro_user(user: UserSchema):
    UserRepository.cadastrar_user(user)
    return user