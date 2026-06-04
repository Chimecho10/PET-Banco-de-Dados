import { useState } from 'react'
import './App.css'

import petlogo from './assets/imagens/petlogo.png'

function App() {
  // Abas
  const [abaInicial, setAbaInicial] = useState(true);
  const [abaSigin, setAbaSigin] = useState(false);
  const [abaEventos, setAbaEventos] = useState(false);
  const [abaParticipantes, setParticipantes] = useState(false);
  const [abaCertificados, setCertificados] = useState(false);

  // Variáveis de Login
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  // Variáveis de Cadastro
  const [usuarioCadastro, setUsuarioCadastro] = useState('');
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');

  const voltarAbaInicial = () => {
    setAbaInicial(true);
    setAbaSigin(false);
  }

  const sigin = () => {
    setAbaInicial(false);
    setAbaSigin(true);
  }

  const login = (evento) => {
    evento.preventDefault();
  }

  if (abaInicial){
    return (
      <div>
      <div style = {{display:'flex',
                     alignItems: 'center',
                     justifyContent:'center',
                     flexDirection: 'row',
                     userSelect: 'none',
                     marginLeft:'60px'}}>
        <div style = {{marginTop:'250px'}}>

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
            </form>

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
            style = {{marginBottom:'-50px',
                      color:'#000000'
        }}>CERTIFICADOS PET</div>

        <div className= 'letreiro'>Cadastro</div>

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
                  value = {senha1}
                  onChange = {(senha1) => setSenha(senha1.target.value)}
                  className = 'campo2'>   
            </input>
          </div>

          <div className= 'discoInput'
              style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput'
            >Senha:</div>

            <input type = "password"
                  value = {senha2}
                  onChange = {(senha2) => setSenha(senha2.target.value)}
                  className = 'campo2'>   
            </input>
          </div>
        </form>
      </div>
    )
  }

  return (
    <h1>oi!</h1>
  )
}

export default App
