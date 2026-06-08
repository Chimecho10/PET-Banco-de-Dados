export const carregarEventosAPI = async (funcoes) => {
    const {setListaDeTeste} = funcoes;
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

export const adicionarEventosAPI = async (campos, funcoes) => {
    const {nome, texto, datainicio, datatermino} = campos;
    const {setNome, setTexto, setDatainicio, setDatatermino} = funcoes

    const dados = {
        titulo: nome,
        texto: texto,
        data_inicio: datainicio,
        data_fim: datatermino
    };
    try {
        const resp = await fetch('http://localhost:8000/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dados)
        });

        if (resp.ok) {
        alert("Evento Criado.");

        // Limpando os dados do formulário
        setNome('');
        setTexto('');
        setDatainicio('');
        setDatatermino('');
        }
    } catch {
        alert("Erro ao criar evento.");
    }
    
};

export const editarEventosAPI = async (campos, funcoes) => {
    const {nome_edicao, texto_edicao, data_inicio_edicao, data_termino_edicao, id_evento} = campos;
    const {setNome_edicao, setTexto_edicao, setData_inicio_edicao, setData_termino_edicao} = funcoes;

    const dados = {
        titulo: nome_edicao,
        texto: texto_edicao,
        data_inicio: data_inicio_edicao,
        data_fim: data_termino_edicao
    };
    try {
        const resp = await fetch(`http://localhost:8000/eventos/${id_evento}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dados)
        });

        if (resp.ok) {
        alert("Evento Editado.");

        // Limpando os dados do formulário
        setNome_edicao('');
        setTexto_edicao('');
        setData_inicio_edicao('');
        setData_termino_edicao('');
        }
    } catch {
        alert("Erro ao editar evento.");
    }
};

export const deletarEventosAPI = async (id_evento) => {
    try {
        const resp = await fetch(`http://localhost:8000/eventos/${id_evento}`, {
            method: 'DELETE',
            headers: { 
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (resp.ok) {
            alert("Evento deletado com sucesso!");
        } else {
            alert("Erro ao deletar o evento.");
    
        }
    } catch (error) {
        alert("Erro ao deletar evento.");
    }
};