from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user, get_current_admin
from repositories import CertificadosRepository
from models import CertificadoModel, CertificadosSchema, CertificadosResponse, CertificadosNomeTitulo
router = APIRouter(
    prefix="/certificados",
    tags=["certificados"]
)


@router.get("/me", status_code=200)
def list_certificados_user(user = Depends(get_current_user)):
    return CertificadosRepository.buscar_certificado_id_user(user.id)

@router.get("/{id}", status_code=200)
def get_certificado(id: int, user_admin = Depends(get_current_admin)):
    certificado = CertificadosRepository.buscar_certificado_id(id)
    if certificado is None:
        raise HTTPException(
            status_code=404,
            detail="Certificado não encontrado."
        )

    return CertificadosResponse(
        id=certificado.id,
        carga_horaria=certificado.carga_horaria,
        id_user=certificado.id_user,
        id_evento=certificado.id_evento
    )

@router.get("/", status_code=200)
def list_certificados(user = Depends(get_current_admin)):
    return CertificadosRepository.listar_certificados()

@router.post("/", status_code=201)
def create_certificado(certificado: CertificadosSchema, user_admin = Depends(get_current_admin)):
    CertificadosRepository.cadastrar_certificado(certificado)
    return {"mensagem": "Certificado criado com sucesso."}

@router.put("/{id}", status_code=200)
def atualizar_certificado(id: int, certificado_update: CertificadosSchema, user_admin = Depends(get_current_admin)):
    certificado = CertificadosRepository.buscar_certificado_id(id)
    if certificado is None:
        raise HTTPException(
            status_code=404,
            detail="Certificado não encontrado."
        )
    certificado = CertificadoModel(
        id=id,
        carga_horaria=certificado_update.carga_horaria,
        id_user= certificado_update.id_user,
        id_evento= certificado_update.id_evento
    )
    CertificadosRepository.atualizar_certificado(certificado)
    return {"mensagem" : "Certificado atualizado com sucesso."}

@router.delete("/{id}", status_code=200)
def delete_certificados(id: int, user_admin = Depends(get_current_admin)):
    certificado = CertificadosRepository.buscar_certificado_id(id)
    if certificado is None:
        raise HTTPException(
            status_code=404,
            detail="Certificado não encontrado."
        )
    CertificadosRepository.deletar_certificado_id(id)
    return {"mensagem" : "Certificado removido."}