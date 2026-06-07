export const carregarEventos = async (funcoes) => {
    const {setListaDeTeste} = funcoes
    try {
        
        const token = localStorage.getItem('token'); 
        
        const resp = await fetch('http://localhost:8000/eventos', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (resp.ok) {
            const dados = await resp.json();
            setListaDeTeste(dados); 
        } else {
            console.error("Erro ao buscar eventos do servidor");
        }
    } catch (error) {
        console.error("Erro de rede:", error);
    }
};

