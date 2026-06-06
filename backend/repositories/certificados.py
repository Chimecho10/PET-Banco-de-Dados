from core import ConnectionDB
from models import CertificadosSchema, CertificadoModel, CertificadosResponse, CertificadosNomeTitulo

class CertificadosRepository:
    @staticmethod
    def _to_certificadoModel(resultQuery) -> CertificadoModel:
        return CertificadoModel(
            id= resultQuery[0],
            carga_horaria= resultQuery[1],
            id_user= resultQuery[2],
            id_evento= resultQuery[3]
        )
    @staticmethod
    def cadastrar_certificado(certificado: CertificadosSchema) -> None:
        queryStr = """
            INSERT INTO certificados (carga_horaria, id_user, id_evento)
            VALUES (%s, %s, %s)
        """
        values = (certificado.carga_horaria, certificado.id_user, certificado.id_evento,)
        with ConnectionDB() as cursor:
            cursor.execute(queryStr, values)
            
    @staticmethod
    def buscar_certificado_id(certificadoid: int) -> CertificadoModel | None:
        queryStr = """
        SELECT id,  carga_horaria, id_user, id_evento FROM certificados
        WHERE id = %s;
        """
        certificado = None
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(certificadoid,))
            resultado = cursor.fetchone()
            if resultado:
                certificado = CertificadosRepository._to_certificadoModel(resultado)
        return certificado

    @staticmethod
    def listar_certificados() -> list[CertificadosNomeTitulo]:
        queryStr = """
            SELECT
                c.id,
                c.carga_horaria,
                c.id_user,
                c.id_evento,
                e.titulo,
                u.nome
            FROM certificados c
            INNER JOIN eventos e
                ON c.id_evento = e.id
            INNER JOIN users u
                ON c.id_user = u.id;
        """
        certificados = list()
        with ConnectionDB() as cursor:
            cursor.execute(queryStr)
            resultados = cursor.fetchall()
            for result in resultados:
                certificado = CertificadosNomeTitulo(
                    id=result[0],
                    carga_horaria= result[1],
                    id_user= result[2],
                    id_evento= result[3],
                    titulo_evento= result[4],
                    nome_user=result[5]
                )
                certificados.append(certificado)
        return certificados    


    @staticmethod
    def buscar_certificado_id_user(id_user: int) -> list[CertificadosNomeTitulo]:
        queryStr = """
            SELECT
                c.id,
                c.carga_horaria,
                c.id_user,
                c.id_evento,
                e.titulo,
                u.nome
            FROM certificados c
            INNER JOIN eventos e
                ON c.id_evento = e.id
            INNER JOIN users u
                ON c.id_user = u.id
            WHERE c.id_user = %s;
        """
        certificados = list()
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(id_user,))
            resultados = cursor.fetchall()
            for result in resultados:
                certificado = CertificadosNomeTitulo(
                    id=result[0],
                    carga_horaria= result[1],
                    id_user= result[2],
                    id_evento= result[3],
                    titulo_evento= result[4],
                    nome_user=result[5]
                )
                certificados.append(certificado)
        return certificados
    
    @staticmethod
    def buscar_certificado_id_evento(id_evento: int) -> list[CertificadoModel]:
        queryStr = """
        SELECT id,  carga_horaria, id_user, id_evento FROM certificados
        WHERE id_evento = %s;
        """
        certificados = list()
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(id_evento,))
            resultados = cursor.fetchall()
            for result in resultados:
                certificado = CertificadosRepository._to_certificadoModel(result)
                certificados.append(certificado)
        return certificados
    
    @staticmethod
    def atualizar_certificado(certificado: CertificadoModel) -> None:
        queryStr = """
            UPDATE certificados
            SET carga_horaria= %s, id_user= %s, id_evento= %s
            WHERE id = %s;
        """
        values = (certificado.carga_horaria, certificado.id_user, certificado.id_evento, certificado.id,)        
        with ConnectionDB() as cursor:
            cursor.execute(queryStr, values)
            
    @staticmethod
    def deletar_certificado_id(certificadoid: int) -> None:
        queryStr = """
            DELETE FROM certificados
            WHERE id = %s;
        """
        with ConnectionDB() as cursor:
            cursor.execute(queryStr,(certificadoid,))