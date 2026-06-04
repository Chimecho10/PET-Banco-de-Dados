import { useEffect, useState } from 'react'
import './App.css'

import petlogo from './assets/imagens/petlogo.png'
import petlogo2 from './assets/imagens/petlogo2.png'

function App() {
  // Abas
  const [abaInicial, setAbaInicial] = useState(true);
  const [abaSigin, setAbaSigin] = useState(false);
  const [abaLobby, setAbaLobby] = useState(false);
  const [abaEventos, setAbaEventos] = useState(false);
  const [abaParticipantes, setAbaParticipantes] = useState(false);
  const [abaCertificados, setAbaCertificados] = useState(false);

  // Variável se o Usuário é ADM ou não
  const [admin, setAdmin] = useState(false);

  // Variáveis de Login
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  // Variáveis de Cadastro
  const [usuarioCadastro, setUsuarioCadastro] = useState('');
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');

  useEffect(() => {
    if (abaLobby){
      document.documentElement.setAttribute('cor', 'amarelo');}
    else {
      document.documentElement.removeAttribute('cor');}
  }, [abaLobby])

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

  const cadastro = (evento) => { // Conectar com o Banco de Dados / Backend
    evento.preventDefault()
    if (usuarioCadastro === '' || senha1 === '' || senha2 === '')
       {alert("Espaços em branco")}
    else if (senha1 !== senha2) 
       {setSenha1('');
        setSenha2('');
        alert("Senhas não compatíveis")}

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
                    marginTop:'200px'}}>
            
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
}

export default App
