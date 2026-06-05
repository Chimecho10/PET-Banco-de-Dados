#Execute após subir o container
#docker exec -it fastapi python -m scripts.criar_admin <admin_id>
from repositories import UserRepository
import sys

if len(sys.argv) != 2:
    print("Você esqueceu de colocar o id!")
    sys.exit(1)

userid = int(sys.argv[1])

if UserRepository.definir_adm(userid):
    print(f"Usuário {userid} promovido para administrador.")
else:
    print("Erro ao definir Admin.")