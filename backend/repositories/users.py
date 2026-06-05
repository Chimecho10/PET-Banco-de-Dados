from core import ConnectionDB
from models import UserCreate, UserModel

class UserRepository:
    @staticmethod
    def cadastrar_user(user: UserCreate) -> None:
        queryStr = """
            INSERT INTO users (username, senha_hash, cpf, nome, ativo)
            VALUES(%s,%s,%s,%s, %s);
        """
        values = (user.username, user.senha, user.cpf, user.nome, True,)
        with ConnectionDB() as cursor:
            cursor.execute(queryStr, values)
    
    @staticmethod
    def cadastrar_user_semAtivo(user: UserCreate) -> None:
        queryStr = """
            INSERT INTO users (username, senha_hash, cpf, nome)
            VALUES(%s,%s,%s, %s);
        """
        values = (user.username, user.senha, user.cpf, user.nome,)
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
    
    @staticmethod
    def buscar_user_userid(userid: int) -> UserModel | None:
        queryStr = """
            SELECT id, username, senha_hash, cpf, nome, adm, ativo FROM users
            WHERE id = %s;
        """
        user = None 
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(userid,))
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
    def atualizar_user(user: UserModel) -> None:
        queryStr = """
            UPDATE users
            SET username= %s, senha_hash= %s, cpf= %s, nome= %s
            WHERE id = %s;
        """
        values = (user.username, user.senha_hash, user.cpf, user.nome, user.id,)
        with ConnectionDB() as cursor:
            cursor.execute(queryStr, values)
            
    @staticmethod
    def deletar_user_userid(userid: int) -> None:
        queryStr = """
            DELETE FROM users
            WHERE id = %s;
        """
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(userid,))
            
    @staticmethod
    def buscar_usernames():
        queryStr = """
            SELECT username FROM users;
        """
        users = None
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,)
            resultado = cursor.fetchall()
            if resultado:
                users = resultado
        return users