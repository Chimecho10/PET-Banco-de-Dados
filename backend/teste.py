#Arquivo reservado para teste de scripts
#Execute com:
#docker exec -it fastapi python teste.py 
from repositories import UserRepository
from models import UserCreate
user = UserCreate(nome= "Cleiton",username="Cleiton",cpf="11122233344",senha="123456")
repos = UserRepository
repos.cadastrar_user(user)