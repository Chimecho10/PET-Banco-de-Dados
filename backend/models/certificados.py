from pydantic import BaseModel

class CertificadosSchema(BaseModel):
    carga_horaria: int
    id_user: int
    id_evento: int
    
class CertificadoModel:
    def __init__(self, id: int, carga_horaria: int, id_user: int, id_evento: int):
        self._id = id
        self._carga_horaria = carga_horaria
        self._id_user = id_user
        self._id_evento = id_evento
        
    @property
    def id(self):
        return self._id
    
    @property
    def carga_horaria(self):
        return self._carga_horaria
    
    @carga_horaria.setter
    def carga_horaria(self, carga_horaria: int):
        self._carga_horaria = carga_horaria
    
    @property
    def id_user(self):
        return self._id_user
    
    @id_user.setter
    def id_user(self, id_user: int):
        self._id_user = id_user
    
    @property
    def id_evento(self):
        return self._id_evento
    
    @id_evento.setter
    def id_evento(self, id_evento: int):
        self._id_evento = id_evento