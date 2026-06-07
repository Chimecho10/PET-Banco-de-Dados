export const enviarCadastro = async (evento, campos, funcoes) => {
    evento.preventDefault();

    // Desestruturando os dados que vieram do formulário
    const { usuarioCadastro, senha1, senha2, cpf, nome } = campos;
    // Desestruturando as funções de alteração de estado
    const { setUsuarioCadastro, setSenha1, setSenha2, setCpf, setNome, setAbaSigin, setAbaInicial } = funcoes;

    // Validações
    if (usuarioCadastro === '' || senha1 === '' || senha2 === '' || cpf === '' || nome === '') {
        alert("Espaços em branco");
        return;
    } else if (cpf.length !== 11) {
        alert("CPF Inválido");
        return;
    } else if (senha1 !== senha2) {
        setSenha1('');
        setSenha2('');
        alert("Senhas não compatíveis");
        return;
    }
      
    const dados = {
        username: usuarioCadastro,
        senha: senha1,
        cpf: cpf,
        nome: nome
    };
    
    try {
        const resp = await fetch('http://127.0.0.1:8000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
        });

        if (resp.ok) {
        alert("Usuário Cadastrado");

        // Limpando os dados do formulário
        setUsuarioCadastro('');
        setSenha1('');
        setSenha2('');
        setCpf('');
        setNome('');

        // Redirecionando para Login
        setAbaSigin(false);    
        setAbaInicial(true);
        }
    } catch {
        alert("Erro ao Cadastrar");
    }
};

export const enviarLogin = async (evento, campos, funcoes) =>{
    evento.preventDefault();
    // Desestruturando os dados que vieram do formulário
    const { usuario, senha} = campos;
    // Desestruturando as funções de alteração de estado
    const { setUsuario, setSenha,setAbaInicial, setAbaLobby } = funcoes;

    const dados = {
    username: usuario,
    senha: senha
    };

        try {
        const resp = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
        });

        if (resp.ok) {
        // 1. Extrai o JSON enviado pelo seu Backend
        const dadosResposta = await resp.json();

        // 2. Salva o access_token no localStorage do navegador
        localStorage.setItem('token', dadosResposta.access_token);

        alert("Login realizado com sucesso.");
        // Limpando os dados do formulário
        setUsuario('');
        setSenha('');

        // Redirecionando para Login  
        setAbaInicial(false);
        setAbaLobby(true);
        }
    } catch {
        alert("Username ou senha inválido!");
    }

}