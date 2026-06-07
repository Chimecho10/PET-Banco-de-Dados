const BASE_URL = 'http://localhost:8000/certificados';

export const listarCertificadosAPI = async (setListaCertificados) =>{
    try {
        
        const token = localStorage.getItem('token'); 
        
        const resp = await fetch(BASE_URL + '/me', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (resp.ok) {
            const dados = await resp.json();
            setListaCertificados(dados); 
        } else {
            console.error("Erro ao buscar certificados.");
        }
    } catch (error) {
        console.error("Erro de rede:", error);
    }
};

export const listarCertificadosAllAPI = async (setListaCertificados) =>{
    try {
        
        const token = localStorage.getItem('token'); 
        
        const resp = await fetch(BASE_URL, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (resp.ok) {
            const dados = await resp.json();
            setListaCertificados(dados); 
        } else {
            console.error("Erro ao buscar certificados.");
        }
    } catch (error) {
        console.error("Erro de rede:", error);
    }
};


export const cadastrarCertificadoAPI = async (dados) => {
    try {
        const token = localStorage.getItem('token');
        const resp = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dados) 
        });
        return resp.ok; 
    } catch (error) {
        console.error("Erro ao cadastrar certificado:", error);
        return false;
    }
};

export const atualizarCertificadoAPI = async (id_certificado, dadosAtualizados) => {
    try {
        const token = localStorage.getItem('token');
        const resp = await fetch(`${BASE_URL}/${id_certificado}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });
        return resp.ok;
    } catch (error) {
        console.error("Erro ao atualizar certificado:", error);
        return false;
    }
};

export const deletarCertificadoAPI = async (id_certificado) => {
    try {
        const token = localStorage.getItem('token');
        const resp = await fetch(`${BASE_URL}/${id_certificado}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return resp.ok;
    } catch (error) {
        console.error("Erro ao deletar certificado:", error);
        return false;
    }
};