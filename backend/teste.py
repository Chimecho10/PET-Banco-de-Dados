#Arquivo reservado para teste de scripts
#Execute com:
#docker exec -it fastapi python teste.py 
from repositories import EventosRepository
from models import EventoModel, EventosSchema
from datetime import date

eventos = EventosRepository.listar_eventos()
for evento in eventos:

    print(f"{evento.id} {evento.titulo} {evento.texto} {evento.data_inicio} {evento.data_fim}")