from core import ConnectionDB
from models import EventosSchema, EventoModel

class EventosRepository:
    @staticmethod
    def _to_evento(resultado) -> EventoModel:
        return EventoModel(
            id= resultado[0],
            titulo= resultado[1],
            texto= resultado[2],
            data_inicio= resultado[3],
            data_fim= resultado[4]
        )

    @staticmethod
    def listar_eventos() -> list[EventoModel]:
        queryStr = """
            SELECT id, titulo, texto, data_inicio, data_fim FROM eventos;
        """
        eventos = list()
        with ConnectionDB() as cursor:
            cursor.execute(queryStr)
            resultados = cursor.fetchall()
            for result in resultados:
                evento = EventosRepository._to_evento(result)
                eventos.append(evento)
        return eventos

    @staticmethod
    def cadastrar_evento(evento: EventosSchema) -> None:
        queryStr = """
            INSERT INTO eventos (titulo, texto, data_inicio, data_fim)
            VALUES (%s, %s, %s, %s)
        """
        values = (evento.titulo, evento.texto, evento.data_inicio, evento.data_fim,)
        with ConnectionDB() as cursor:
            cursor.execute(queryStr, values)
    
    @staticmethod
    def buscar_evento_titulo(eventoTitulo: str) -> EventoModel | None:
        queryStr = """
        SELECT id,  titulo, texto, data_inicio, data_fim FROM eventos
        WHERE titulo = %s;
        """
        evento = None
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(eventoTitulo,))
            resultado = cursor.fetchone()
            if resultado:
                evento = EventoModel(
                    id= resultado[0],
                    titulo= resultado[1],
                    texto= resultado[2],
                    data_inicio= resultado[3],
                    data_fim= resultado[4]
                )
        return evento
    
    @staticmethod
    def buscar_evento_id(eventoid: int) -> EventoModel | None:
        queryStr = """
        SELECT id,  titulo, texto, data_inicio, data_fim FROM eventos
        WHERE id = %s;
        """
        evento = None
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(eventoid,))
            resultado = cursor.fetchone()
            if resultado:
                evento = EventoModel(
                    id= resultado[0],
                    titulo= resultado[1],
                    texto= resultado[2],
                    data_inicio= resultado[3],
                    data_fim= resultado[4]
                )
        return evento
    
    @staticmethod
    def atualizar_evento(evento: EventoModel) -> None:
        queryStr = """
            UPDATE eventos
            SET titulo= %s, texto= %s, data_inicio= %s, data_fim= %s
            WHERE id = %s;
        """
        values = (evento.titulo, evento.texto, evento.data_inicio, evento.data_fim, evento.id,)
        with ConnectionDB() as cursor:
            cursor.execute(queryStr, values)
    
    @staticmethod
    def deletar_evento_id(eventoid: int) -> None:
        queryStr = """
            DELETE FROM eventos
            WHERE id = %s;
        """
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(eventoid,))