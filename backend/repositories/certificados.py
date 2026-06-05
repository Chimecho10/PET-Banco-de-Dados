from core import ConnectionDB
from models import CertificadosSchema, CertificadoModel

class CertificadosRepository:
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
                certificado = CertificadoModel(
                    id= resultado[0],
                    carga_horaria= resultado[1],
                    id_user= resultado[2],
                    id_evento= resultado[3]
                )
        return certificado
    
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