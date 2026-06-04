from pydantic import BaseModel

class UserSchema(BaseModel):
    username: str
    senha: str
    cpf: str
    nome: str
