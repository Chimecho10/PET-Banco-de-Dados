from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_admin, get_current_user
from repositories import EventosRepository
from models import EventosSchema, EventoModel, EventosResponse

router = APIRouter(
    prefix="/eventos",
    tags=["eventos"]
)

@router.get("/me", status_code=200)
def listar_eventos_user(user = Depends(get_current_user)):
    eventos_list = EventosRepository.buscar_eventos_user_id(user.id)
    eventos_response =  list()
    for evento in eventos_list:
        eventos_response.append(
            EventosResponse(
                id= evento.id,
                titulo= evento.titulo,
                texto= evento.texto,
                data_inicio= evento.data_inicio,
                data_fim= evento.data_fim
            )
        )
    return eventos_response


@router.get("/", status_code=200)
def listar_eventos(user_admin = Depends(get_current_admin)):
    eventos_list = EventosRepository.listar_eventos()
    eventos_response =  list()
    for evento in eventos_list:
        eventos_response.append(
            EventosResponse(
                id= evento.id,
                titulo= evento.titulo,
                texto= evento.texto,
                data_inicio= evento.data_inicio,
                data_fim= evento.data_fim
            )
        )
    return eventos_response

@router.get("/{id}", status_code=200)
def get_evento(id: int, user_admin= Depends(get_current_admin)):
    evento = EventosRepository.buscar_evento_id(id)
    if not evento:
        raise HTTPException(
            status_code=404,
            detail= "Evento não encontrado"
        )
    return EventosResponse(
        id= evento.id,
        titulo= evento.titulo,
        texto= evento.texto,
        data_inicio= evento.data_inicio,
        data_fim= evento.data_fim
    )

@router.post("/", status_code=201)
def create_evento(evento: EventosSchema, user_admin = Depends(get_current_admin)):
    EventosRepository.cadastrar_evento(evento)
    return {"mensagem" : "Evento cadastrado com sucesso."}

@router.put("/{id}", status_code=200)
def put_evento(id:int, evento_update: EventosSchema, user_admin = Depends(get_current_admin)):
    evento = EventoModel(
        id= id,
        titulo= evento_update.titulo,
        texto= evento_update.texto,
        data_inicio= evento_update.data_inicio,
        data_fim= evento_update.data_fim
    )
    EventosRepository.atualizar_evento(evento)
    return {"mensagem" : "Evento atualizado com sucesso."}

@router.delete("/{id}", status_code=200)
def delete_evento(id: int, user_admin = Depends(get_current_admin)):
    EventosRepository.deletar_evento_id(id)
    return {"mensagem" : "Evento removido com sucesso."}