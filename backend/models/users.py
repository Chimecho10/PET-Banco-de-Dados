from pydantic import BaseModel


class LoginSchema(BaseModel):
    username: str
    senha: str

class UserBase(BaseModel):
    username: str
    cpf: str
    nome: str

class UserCreate(UserBase):
    senha: str

class PasswordSchema(UserBase):
    senha: str
    confirmar_senha: str

class PasswordUpdate(BaseModel):
    senha_atual: str
    nova_senha: str
    confirmar_nova_senha: str

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
    def id(self):
        return self._id

    @property
    def username(self):
        return self._username
    
    @username.setter
    def username(self, username: str):
        self._username = username
    
    @property
    def senha_hash(self):
        return self._senha_hash
    
    @senha_hash.setter
    def senha_hash(self, nova_senha: str):
        self._senha_hash = nova_senha
    
    @property
    def cpf(self):
        return self._cpf
    
    @cpf.setter
    def cpf(self, cpf: str):
        self._cpf = cpf

    @property
    def nome(self):
        return self._nome
    
    @nome.setter
    def nome(self, nome: str):
        self._nome = nome


    @property
    def adm(self):
        return self._adm
    
    @property
    def ativo(self):
        return self._ativo