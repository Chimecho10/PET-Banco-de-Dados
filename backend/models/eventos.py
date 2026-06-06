from pydantic import BaseModel
from datetime import date

class EventosSchema(BaseModel):
    titulo: str
    texto: str
    data_inicio: date
    data_fim: date

class EventosResponse(EventosSchema):
    id: int

class EventoModel:
    def __init__(self, id: int, titulo: str, texto: str, data_inicio: date, data_fim: date):
        self._id = id
        self._titulo = titulo
        self._texto = texto
        self._data_inicio = data_inicio
        self._data_fim = data_fim

    @property
    def id(self):
        return self._id

    @property
    def titulo(self):
        return self._titulo

    @titulo.setter
    def titulo(self, titulo: str):
        self._titulo = titulo

    @property
    def texto(self):
        return self._texto

    @texto.setter
    def texto(self, texto: str):
        self._texto = texto

    @property
    def data_inicio(self):
        return self._data_inicio

    @data_inicio.setter
    def data_inicio(self, data_inicio: date):
        self._data_inicio = data_inicio

    @property
    def data_fim(self):
        return self._data_fim

    @data_fim.setter
    def data_fim(self, data_fim: date):
        self._data_fim = data_fim