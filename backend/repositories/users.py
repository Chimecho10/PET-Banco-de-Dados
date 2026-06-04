from core import ConnectionDB

class UserRepository:
    @staticmethod
    def criar_user(username: str, senha_hash: str, cpf: str, nome: str):
        queryStr = """
            INSERT INTO users (username, senha_hash, cpf, nome)
            VALUES(%s,%s,%s,%s);
        """
        values = (username, senha_hash, cpf, nome,)
        with ConnectionDB() as cursor:
            cursor.execute(queryStr, values)