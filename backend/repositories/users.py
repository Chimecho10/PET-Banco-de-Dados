from core import ConnectionDB
from models import UserSchema

class UserRepository:
    @staticmethod
    def cadastrar_user(user: UserSchema) -> None:
        queryStr = """
            INSERT INTO users (username, senha_hash, cpf, nome)
            VALUES(%s,%s,%s,%s);
        """
        values = (user.username, user.senha_hash, user.cpf, user.nome,)
        with ConnectionDB() as cursor:
            cursor.execute(queryStr, values)
    
    @staticmethod
    def definir_adm(username: str):
        pass