export const listarCertificadosAPI = async (setListaCertificados) =>{
    try {
        
        const token = localStorage.getItem('token'); 
        
        const resp = await fetch('http://localhost:8000/certificados/me', {
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