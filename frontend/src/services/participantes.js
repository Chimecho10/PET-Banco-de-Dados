export const editarParticipanteAPI = async (campos, funcoes) => {
    const {nome_edicao, cpf_edicao, username_edicao, id_part} = campos;
    const {setNome_edicao, setCpf_edicao, setUsername_edicao, setId_part} = funcoes;

    const dados = {
        nome: nome_edicao,
        cpf: cpf_edicao,
        username: username_edicao
    };
    
    try {
        const resp = await fetch(`http://localhost:8000/users/${id_part}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dados)
        });

        if (resp.ok) {
            alert("Participante Editado.");

            // Limpando os dados do formulário
            if(setNome_edicao) setNome_edicao('');
            if(setCpf_edicao) setCpf_edicao('');
            if(setUsername_edicao) setUsername_edicao('');
            if(setId_part) setId_part('');
            return true; // Retorna true para o componente saber que deu certo e fechar o modal
        }
        return false;
    } catch (error) {
        alert("Erro ao editar participante.");
        return false;
    }
};

export const deletarParticipanteAPI = async (id_participante) => {
    try {
        const resp = await fetch(`http://localhost:8000/users/${id_participante}`, {
            method: 'DELETE',
            headers: { 
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (resp.ok) {
            alert("Participante deletado com sucesso!");
            return true;
        } else {
            alert("Erro ao deletar o participante.");
            return false;
        }
    } catch (error) {
        alert("Erro de rede ao deletar participante.");
        return false;
    }
};

export const carregarParticipantesAPI = async (setListaDeTeste) => {
    try {
        const token = localStorage.getItem('token'); 
        
        const resp = await fetch('http://localhost:8000/users', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (resp.ok) {
            const dados = await resp.json();
            
            if (typeof setListaDeTeste === 'function') {
                setListaDeTeste(dados); 
            } else if (setListaDeTeste.setListaDeTeste) {
                setListaDeTeste.setListaDeTeste(dados);
            }
        } else {
            console.error("Erro ao buscar participantes do servidor");
        }
    } catch (error) {
        console.error("Erro de rede:", error);
    }
};

export const enviarParticipante = async (evento, campos, funcoes) => {
    // Evita o recarregamento da página
    if (evento && typeof evento.preventDefault === 'function') {
        evento.preventDefault();
    }

    const { username, nome, cpf } = campos;
    const { setJanelaEditar, setUsername, setCpf, setNome } = funcoes;

    const dados = {
        username: username,
        nome: nome,
        cpf: cpf,
    };
    
    try {
        const resp = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
         },
        body: JSON.stringify(dados)
        });

        if (resp.ok) {
            alert("Participante Adicionado!");

            // Limpando os dados do formulário
            if(setUsername) setUsername('');
            if(setCpf) setCpf('');
            if(setNome) setNome('');

            // Fechando Janela
            if(setJanelaEditar) setJanelaEditar(false);
            return true;
        }
        return false;
    } catch (error) {
        alert("Erro ao Adicionar");
        return false;
    }
};