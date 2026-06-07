export const deletarParticipanteAPI = async (id_participante) => {
    try {
        const resp = await fetch(`http://localhost:8000/eventos/${id_participante}`, {
            method: 'DELETE',
            headers: { 
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (resp.ok) {
            alert("Participante deletado com sucesso!");
        } else {
            alert("Erro ao deletar o participante.");
    
        }
    } catch (error) {
        alert("Erro ao deletar evento.");
    }
};

export const carregarParticipantesAPI = async (funcoes) => {
    const {setListaDeTeste} = funcoes
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
            setListaDeTeste(dados); 
        } else {
            console.error("Erro ao buscar participantes do servidor");
        }
    } catch (error) {
        console.error("Erro de rede:", error);
    }
};

export const enviarParticipante = async (evento, campos, funcoes) => {
    evento.preventDefault();

    // Desestruturando os dados que vieram do formulário
    const { username, nome, cpf } = campos;
    // Desestruturando as funções de alteração de estado
    const { setJanelaEditar, setUsername, setCpf, setNome } = funcoes;

    const dados =
       {username: username,
        nome: nome,
        cpf: cpf,};
    
    try {
        const resp = await fetch('http://localhost:8000/users/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
        });

        if (resp.ok) {
        alert("Participante Adicionado!");

        // Limpando os dados do formulário
        setUsername('');
        setCpf('');
        setNome('');

        // Fechando Janela
        setJanelaEditar(false);
        }
    } catch {
        alert("Erro ao Adicionar");
    }
};