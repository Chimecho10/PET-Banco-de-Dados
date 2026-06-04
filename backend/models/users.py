from pydantic import BaseModel

class LoginSchema(BaseModel):
    username: str
    senha: str

class UpdateSchema(BaseModel):
        id: int
        username: str
        senha: str
        cpf: str
        nome: str

class UserSchema(BaseModel):
    username: str
    senha: str
    cpf: str
    nome: str

class UserModel:
    def __init__(self,id: int, username:str, senha_hash: str, cpf: str, nome: str, adm: bool, ativo: bool):
        self._id = id
        self._username = username
        self._senha_hash = senha_hash
        self._cpf = cpf
        self._nome = nome
        self._adm = adm
        self._ativo = ativo

    @property
    def username(self):
        return self._username
    
    @property
    def senha_hash(self):
        return self._senha_hash
    
    @property
    def ativo(self):
        return self._ativo