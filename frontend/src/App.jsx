import { useEffect, useState } from 'react'
import './App.css'

//Páginas
import Aba_Eventos from './pages/Aba_Eventos.jsx'
import Aba_Inicial from './pages/Aba_Inicial.jsx'
import Aba_Cadastro from './pages/Aba_Cadastro.jsx'
import Aba_Lobby from './pages/Aba_Lobby.jsx'
import Aba_Participantes from './pages/Aba_Participantes.jsx'
import Aba_Certificados from './pages/Aba_Certificados.jsx'
import Aba_MeusCertificados from './pages/Aba_MeusCertificados.jsx'

//Imagens
import petlogo from './assets/imagens/petlogo.png'

function App() {
  // Abas
  const [abaInicial, setAbaInicial] = useState(true);
  const [abaSigin, setAbaSigin] = useState(false);
  const [abaLobby, setAbaLobby] = useState(false);
  const [abaEventos, setAbaEventos] = useState(false);
  const [abaParticipantes, setAbaParticipantes] = useState(false);
  const [abaCertificados, setAbaCertificados] = useState(false);
  const [abaAdicionarEvento, setAbaAdicionarEvento] = useState(false);
  const [abaMeuscertificados, setAbaMeuscertificados] = useState(false);

  // Variáveis de Login
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  // Variáveis de Cadastro
  const [usuarioCadastro, setUsuarioCadastro] = useState('');
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');

  // Variáveis do Usuário Logado
  const [userLogado, setUserLogado] = useState('');
  const [userCpf, setUserCPF] = useState('');
  const [admin, setAdmin] = useState(false);

  // Variáveis de Evento
  const [nomeDoEvento, setNomeDoEvento] = useState('');

  useEffect(() => {
    if (!abaInicial && !abaSigin){
      document.documentElement.setAttribute('cor', 'amarelo');}
    else {
      document.documentElement.removeAttribute('cor');}
  }, [abaInicial])

  const meuscertificados = () => {
    setAbaMeuscertificados(true);
    setAbaLobby(false);
  }

  const eventos = () => {
    setAbaEventos(true);
    setAbaLobby(false);
  }

  const participantes = () => {
    setAbaParticipantes(true);
    setAbaLobby(false);
  }
  
  const certificados = () => {
    setAbaCertificados(true);
    setAbaLobby(false);
  }

  const voltarAbaInicial = () => {
    setCpf('');
    setNome('');
    setUsuarioCadastro('');
    setSenha1('');
    setSenha2('');
    setAbaSigin(false);
    setAbaLobby(false);
    setAbaInicial(true);
  }

  const sigin = () => {
    setUsuario('');
    setSenha('');
    setAbaInicial(false);
    setAbaSigin(true);
  }

  const ir = () => {
    setAbaInicial(false);
    setAbaLobby(true);
  }

  const login = (evento) => { // Conectar com o Banco de Dados / Backend
    evento.preventDefault();
  }

  const cadastro = async (evento) => {
    evento.preventDefault()
    if (usuarioCadastro === '' || senha1 === '' || senha2 === '' || cpf === '' || nome === '')
       {alert("Espaços em branco");
        return;}
    else if (cpf.length !== 11)
       {alert("CPF Inválido");
        return;}
    else if (senha1 !== senha2) 
       {setSenha1('');
        setSenha2('');
        alert("Senhas não compatíveis");
        return;}
        
    const dados =
     {username: usuarioCadastro,
      senha: senha1,
      cpf: cpf,
      nome: nome,}
    
    try{
      const resp = await fetch('http://localhost:8000/cadastro', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)});

      if (resp.ok)
       {alert("ok!")
        setUserLogado(usuarioCadastro);
        setUserCPF(cpf);
        setAbaSigin(false);
        setAbaLobby(true);}}

    catch{
      alert("Erro ao Cadastrar");
    }

  }

  const voltarAbaLobby = () => {
    setAbaMeuscertificados(false);
    setAbaCertificados(false);
    setAbaEventos(false);
    setAbaParticipantes(false);
    setAbaLobby(true);
  }

  const adminfalse = () => 
    {setAdmin(false);}

  const admintrue = () => 
    {setAdmin(true);}

  if (abaInicial){
    return <Aba_Inicial ir={ir} 
                        sigin={sigin}
                        usuario={usuario}
                        setUsuario={setUsuario}
                        senha={senha}
                        petlogo={petlogo}
                        setSenha={setSenha}/>
  }

  if (abaSigin){
    return <Aba_Cadastro cadastro={cadastro} 
                         usuarioCadastro={usuarioCadastro}
                         setUsuarioCadastro={setUsuarioCadastro}
                         nome={nome}
                         setNome={setNome}
                         senha1={senha1}
                         senha2={senha2}
                         setSenha1={setSenha1}
                         setSenha2={setSenha2}
                         cpf={cpf}
                         setCpf={setCpf}
                         voltarAbaInicial={voltarAbaInicial}/>
  }

  if (abaLobby){
    return <Aba_Lobby eventos={eventos}
                      admin={admin}
                      voltarAbaInicial={voltarAbaInicial}
                      meuscertificados={meuscertificados}
                      participantes={participantes}
                      certificados={certificados}/>
  }

  if (abaEventos){
    return <Aba_Eventos voltarAbaLobby={voltarAbaLobby}/>
  }

  if (abaParticipantes){
    return <Aba_Participantes voltarAbaLobby={voltarAbaLobby}/>
  }

  if (abaCertificados){
    return <Aba_Certificados voltarAbaLobby={voltarAbaLobby}/>
  }

  if (abaMeuscertificados){
    return <Aba_MeusCertificados voltarAbaLobby={voltarAbaLobby}/>
  }
}

export default App
