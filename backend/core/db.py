import pymysql


# Classe criada para estabelecer conexão com o banco de dados.
# A função __enter__() é executada quando chamada em um bloco with
# E a função __exit__() é chamada quando esse bloco termina.
# Exemplo de uso:
# with ConnectionDB() as cursor:
# cursor.execute(
#     "INSERT INTO users (username, senha_hash, cpf, nome) VALUES (%s,%s,%s,%s)",
#     ("cleiton_borracheiro", "hash123", "12345678901", "Cleiton")
# )


class ConnectionDB:
    def __enter__(self):
        self.connection = pymysql.connect(
            host= "mysql",
            port= 3306,
            user= "app_user",
            password= "app_password",
            database= "app_db",
            charset="utf8mb4"
        )
        self.cursor = self.connection.cursor()
        return self.cursor
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.connection.rollback()
        else:
            self.connection.commit()

        self.cursor.close()
        self.connection.close()