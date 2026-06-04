from core import ConnectionDB
from models import UserSchema, UserModel

class UserRepository:
    @staticmethod
    def cadastrar_user(user: UserSchema) -> None:
        queryStr = """
            INSERT INTO users (username, senha_hash, cpf, nome, ativo)
            VALUES(%s,%s,%s,%s, %s);
        """
        values = (user.username, user.senha, user.cpf, user.nome, True,)
        with ConnectionDB() as cursor:
            cursor.execute(queryStr, values)
    
    @staticmethod
    def buscar_user_username(username: str) -> UserModel | None:
        queryStr = """
            SELECT id, username, senha_hash, cpf, nome, adm, ativo FROM users
            WHERE username = %s;
        """
        user = None
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(username,))
            resultado = cursor.fetchone()
            if resultado:
                user = UserModel(
                    id= resultado[0],
                    username= resultado[1],
                    senha_hash= resultado[2],
                    cpf= resultado[3],
                    nome= resultado[4],
                    adm= resultado[5],
                    ativo= resultado[6]
                )
        return user


    @staticmethod
    def definir_adm(username: str):
        pass