#Arquivo reservado para teste de scripts
#Execute com:
#docker exec -it fastapi python teste.py 
from repositories import UserRepository

repos = UserRepository
repos.criar_user("Cleiton","1234","113234","cleiton")