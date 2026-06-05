import { useEffect, useState } from 'react'
import './App.css'

import petlogo from './assets/imagens/petlogo.png'
import petlogo2 from './assets/imagens/petlogo2.png'
import lupa from './assets/imagens/lupa.png'
import adicionar from './assets/imagens/adicionar.png'

function App() {
  // Abas
  const [abaInicial, setAbaInicial] = useState(true);
  const [abaSigin, setAbaSigin] = useState(false);
  const [abaLobby, setAbaLobby] = useState(false);
  const [abaEventos, setAbaEventos] = useState(false);
  const [abaParticipantes, setAbaParticipantes] = useState(false);
  const [abaCertificados, setAbaCertificados] = useState(false);
  const [abaAdicionarEvento, setAbaAdicionarEvento] = useState(false);

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

  const adicionarEvento = () => {
    setAbaEventos(false);
    setAbaAdicionarEvento(true);
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
    setAbaInicial(true);
    setAbaSigin(false);
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

  const cadastro = async (evento) => { // Conectar com o Banco de Dados / Backend
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
     {userD: usuarioCadastro,
      senhaD: senha1,
      cpfD: cpf,
      nomeD: nome,}
    
    try{
      const resp = await fetch('http://localhost:8000/cadastro', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)});

      if (resp.ok)
       {setUserLogado(usuarioCadastro);
        setUserCPF(cpf);
        setAbaSigin(false);
        setAbaLobby(true);}}

    catch{
      alert("Erro ao Cadastrar");
    }

  }

  const procurarEvento = (evento) => {
    evento.preventDefault()
  }

  if (abaInicial){
    return (
      <div>
      <button onClick={ir}
              style = {{position: 'absolute',
                        justifyContent:'center'}}>
      Ir</button>
      <div style = {{display:'flex',
                     alignItems: 'center',
                     justifyContent:'center',
                     flexDirection: 'row',
                     userSelect: 'none',
                     marginLeft:'60px'}}>

        <div style = {{marginTop:'200px'}}>

          <div style = {{display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'}}>
            
            <div className='gerenciamento'
                style = {{marginBottom:'15px',
                          color:'#000000'
            }}>GERENCIAMENTO DE</div>

            <div className='gerenciamento'
                style = {{marginBottom:'-50px',
                          color:'#000000'
            }}>CERTIFICADOS PET</div>

            <div className= 'letreiro'>Login</div>

            <form onSubmit = {login}>
              <div className= 'discoInput'
                  style = {{marginTop: '7px'}}>

                <div className= 'letreiroDiscoInput'
                >Usuário:</div>

                <input type = "text"
                      value = {usuario}
                      onChange = {(user) => setUsuario(user.target.value)}
                      className = 'campo1'>   
                </input>

              </div>

              <div className= 'discoInput'
                  style = {{marginTop:'8px'}}>

                <div className= 'letreiroDiscoInput'
                >Senha:</div>

                <input type = "password"
                      value = {senha}
                      onChange = {(senha) => setSenha(senha.target.value)}
                      className = 'campo2'>   
                </input>

              </div>

            </form>

            <button onClick = {sigin}
                      style = {{marginTop:'8px',
                                border:'none',
                                cursor: 'pointer',
                                outline:'none',
                                userSelect: 'none',
                                backgroundColor: '#f6f6f600',
              }}>
                <div className = 'botaoCadastro'
                     style = {{display: 'flex',
                               justifyContent: 'center',
                               alignItems: 'center',
                               userSelect: 'none',
                     }}>
                  
                  <h1 style = {{
                                marginTop: '28px',
                                fontFamily: 'Montserrat',
                                fontSize: '25px',
                                userSelect: 'none',
                  }}>
                    Novo Cadastro</h1>
                </div>
              </button>

            <hr style = {{color: '#000000',
                          backgroundColor: '#000000',
                          height:'1px',
                          width:'300px',
                          marginTop:'0px',
                          userSelect: 'none',}}>
            </hr>
          </div>   

        </div>
        <div style = {{userSelect:'none',
                       marginTop:'200px',
                       marginLeft:'200px',
        }}>
        <img src={petlogo}/>
        </div>
      </div>
        <div style={{display:'flex',
                     alignItems: 'center',
                     justifyContent:'center',
                     flexDirection: 'column'}}>
          <div className='universidade'
              style = {{display: 'flex',
                        marginTop: '30px',
                        color:'#000000'
          }}>UNIVERSIDADE FEDERAL DO CEARÁ</div>

          <div className='universidade'
              style = {{color:'#000000'
          }}>UFC</div> 

        </div>
      </div>
    )
  }

  if (abaSigin){
    return (
      <div style = {{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop:'100px'}}>
            
        <div className='gerenciamento'
            style = {{marginBottom:'15px',
                      color:'#000000'
        }}>GERENCIAMENTO DE</div>

        <div className='gerenciamento'
            style = {{marginBottom:'-70px',
                      color:'#000000'
        }}>CERTIFICADOS PET</div>

        <div className= 'letreiro'>Cadastro</div>

        <form onSubmit = {cadastro}>

          <div className= 'discoInput2'
              style = {{marginTop: '-20px'}}>

            <div className= 'letreiroDiscoInput2'
            >Usuário:</div>

            <input type = "text"
                  value = {usuarioCadastro}
                  onChange = {(user) => setUsuarioCadastro(user.target.value)}
                  className = 'campo1'>   
            </input>
          </div>

          <div className= 'discoInput2'
              style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput2'
            >Nome:</div>

            <input type = "text"
                  value = {nome}
                  onChange = {(nome) => setNome(nome.target.value)}
                  className = 'campo2'>   
            </input>
          </div>

          <div className= 'discoInput2'
              style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput2'
            >CPF:</div>

            <input type = "text"
                   inputmode="numeric" 
                   pattern="[0-9]*" 
                   value = {cpf}
                   onChange = {(cpf) => 
                               {const dig = cpf.target.value;
                                const tig = dig.replace(/\D/g, '');
                                if (tig.length <= 11)
                                {setCpf(tig)}}}
                   className = 'campo2'>   
            </input>
          </div>

          <div className= 'discoInput2'
              style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput2'
            >Senha:</div>

            <input type = "password"
                  value = {senha1}
                  onChange = {(senha1) => setSenha1(senha1.target.value)}
                  className = 'campo2'>   
            </input>
          </div>

          <div className= 'discoInput2'
              style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput2'
            >Confirmação de Senha:</div>

            <input type = "password"
                  value = {senha2}
                  onChange = {(senha2) => setSenha2(senha2.target.value)}
                  className = 'campo2'>   
            </input>
          </div>

          <button onClick = {voltarAbaInicial}
                  className='cadastroVoltar'
                  style = {{marginRight: '30px'}}
          >Voltar</button>
          
          <button type = "submit"
                  className='enviarCadastro'
                  style = {{marginTop: '20px',}}
          >Enviar</button>

        </form>
      </div>
    )
  }

  if (abaLobby){
    return (
      <div>
        <div className = 'blocaoPreto'
             style = {{display:'flex',
                       justifyContent:'center',
                       alignItems:'center',           
             }}>
          <div style = {{display: 'flex',
                         gap: '10px'}}>
            <button onClick={eventos}
                    className='bloquinhoAmarelo'>
            EVENTOS</button>
            <button onClick={participantes}
                    className='bloquinhoAmarelo'>
            PARTICIPANTES</button>
            <button onClick={certificados}
                    className='bloquinhoAmarelo'>
            CERTIFICADOS</button>
          </div>
        </div>
        <div style = {{margin: '0 auto',
                       flexDirection: 'column',
                       height: '75vh',
                       display: 'flex',
                       marginTop: '-90px',
                       justifyContent: 'center',
                       alignItems: 'center',}}>
          <h1 className= 'letreiro2'
              style = {{marginBottom:'-40px'}}
          >Gerenciamento</h1>
          <h1 className= 'letreiro2'
              style = {{marginBottom:'-40px'}}    
          >de</h1>
          <h1 className= 'letreiro2'>Certificados</h1>
        </div>
        
        <div className = 'blocaoVermelho'
             style = {{userSelect: 'none',}}>

          <img src={petlogo2}
               style = {{marginTop: '-90px'}}/>
               
        </div>

      </div>
    )
  }

  if (abaEventos){
    return (
      <div>
        <div style = {{display:'flex',
                        flexDirection:'row',
                        justifyContent:'center'}}>
          <div style = {{marginTop: '80px',
                          marginRight: '150px',
                          marginLeft: '200px',
                          userSelect: 'none',
            }}>
            <h1 className = 'letreiro3'
                style = {{marginBottom: '0px'}}        
                >EVENTOS</h1>
            <hr className = 'linhavermelha'
                style = {{marginTop: '0px'}} />
          </div>
          <div className = 'procurando'
                style = {{userSelect: 'none',
                          marginLeft: '20px',
                          marginTop: '105px',}}>
              <form submit={procurarEvento}
                    style = {{display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center'}}>
                <input type = "text"
                        value = {nomeDoEvento}
                        placeholder='Procure Um Evento...'
                        onChange = {(nomeDoEvento) => setNomeDoEvento(nomeDoEvento.target.value)}
                        className = 'campo3'></input>
                <div className = 'linhavertical'></div>
                <button type = 'submit'
                        style = {{border: 'none',
                                  color: '#00000000',
                                  cursor: 'pointer',
                                  backgroundColor: '#00000000',}}>
                  <img src={lupa} style = {{width: '25px',
                                            marginLeft: '-5px'}}/>
                </button>
              </form>
          </div>
          <div>
            <button  onClick = {adicionarEvento}
                      style = {{marginTop: '109px',
                              marginLeft: '20px',
                              userSelect: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
              <img src={adicionar}/> 

            </button>
          </div>
        </div>
        <div style = {{display: 'flex',
                       flexDirection: 'row',
                       marginTop: '50px',
                       gap: '90px',
                       justifyContent: 'center'}}>
          <div className='letreiro4'>EVENTO</div>
          <div className='letreiro4'>DATA DE INÍCIO</div>
          <div className='letreiro4'>DATA DE TÉRMINO</div>
          <div className='letreiro4'>AÇÕES</div>
        </div>
      </div>
    )
  }
}

export default App
