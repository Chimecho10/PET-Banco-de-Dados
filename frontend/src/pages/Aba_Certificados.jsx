import React, { useState, useEffect } from 'react'

import lupa from '../assets/imagens/lupa.png'
import add from '../assets/imagens/adicionar_certificados.png'
import editar from '../assets/imagens/editarparticipante.png'
import excluir from '../assets/imagens/excluirparticipante.png'
import sair from '../assets/imagens/sair.png'
import { listarCertificadosAllAPI, cadastrarCertificadoAPI, atualizarCertificadoAPI, deletarCertificadoAPI } from '../services/certificados'

export default function Aba_Participantes({voltarAbaLobby})
{

// VARIÁVEIS DE ADICIONAR CERTIFICADO 
const [idCertificadoSelecionado, setIdCertificadoSelecionado] = useState(null);
const [janelaAdicionar, setJanelaAdicionar] = useState(null);
const [id_evento, setEvento] = useState('');
const [id_aluno, setAluno] = useState('');
const [horas, setHoras] = useState('');

  const addpartrue = () =>
    {setJanelaAdicionar(true);}
  

  const desaddpartrue = () => 
   {setEvento('');
    setAluno('');
    setJanelaAdicionar(false);}

// VARIÁVEIS DE EDITAR CERTIFICADO
const [janelaEditar, setJanelaEditar] = useState(null);
const [id_evento_edicao, setEvento_edicao] = useState('');
const [id_aluno_edicao, setAluno_edicao] = useState('');
const [horas_edicao, setHoras_edicao] = useState('');
const [id_evento_ofc, setEvento_ofc] = useState('');
const [id_aluno_ofc, setAluno_ofc] = useState('');
const [horas_ofc, setHoras_ofc] = useState('');

  const editartrue = (cert) =>
   {//INFORMAÇÕES DO CERTIFICADO ORIGINAL
    setAluno_ofc(cert.id_usuario);
    setEvento_ofc(cert.id_evento);
    setHoras_ofc(cert.horas)

    //INFORMAÇÕES DO CERTIFICADO EDITADO
    setAluno_edicao(cert.id_usuario);
    setEvento_edicao(cert.id_evento);
    setHoras_edicao(cert.horas)
    setJanelaEditar(true);}

  const editarfalse = (e) =>
    {e.preventDefault()
     setJanelaEditar(false);}

  const editarCertificado = (e) =>
    { e.preventDefault()
      // INTEGRAR COM O BACKEND (EDIÇÃO DE CERTIFICADO)
    }

// DELETAR CERTIFICADO
const [janelaDeletar, setJanelaDeletar] = useState(null);
const [id_aluno_deletando, setId_aluno_deletando] = useState(null);
const [id_evento_deletando, setId_evento_deletando] = useState(null);
const [nome_aluno_deletando, setNome_aluno_deletando] = useState('');
const [nome_evento_deletando, setNome_evento_deletando] = useState('');
const [horas_deletando, setHoras_deletando] = useState(null);

  const deletartrue = (cert) =>
   {setId_aluno_deletando(cert.id_usuario)
    setId_evento_deletando(cert.id_evento)
    setNome_aluno_deletando(requisitarNomeAluno(cert.id_usuario))
    setNome_evento_deletando(cert.evento)
    setHoras_deletando(cert.horas)
    setJanelaDeletar(true);}

  const deletarfalse = (e) =>
  {e.preventDefault()
    setJanelaDeletar(false);}

  const deletarCertificado = (e) => {
    e.preventDefault()

    // INTEGRAR COM O BACKEND (DELETAR CERTIFICADO)


    setJanelaDeletar(false);;
  }

// VARIÁVEIS DE BUSCA
const [nomeouevento, setNomeouevento] = useState(''); 
const [procurando, setProcurando] = useState(false);
const [buscanalista, setBuscaNaLista] = useState(null);
const [listaCertificados, setListaCertificados] = useState([]);

useEffect(() => {
    listarCertificadosAllAPI(setListaCertificados);
}, []);




const adicionarcertificado = (e) => {
  e.preventDefault()
  if (id_evento === '' || id_aluno === '' || horas === '')
    {alert("Espaço em Branco!")}

  //CONECTAR COM BACKEND A PARTIR DAQUI
  else {
    const resposta = true;

    //BACKEND AQUI


    if (resposta)
      {alert("Certificado Adicionado!");}
    else 
      {alert("Erro Interno");}
  }
}

const procurarParticipantes = (e) => {
  e.preventDefault();
  if (nomeouevento !== '')
    {setProcurando(true);
     const busca = listaComNomes.filter((user) => {
        const achouAluno = user.nome_aluno.toLowerCase().includes(nomeouevento.toLowerCase());
        const achouEvento = user.evento.toLowerCase().includes(nomeouevento.toLowerCase());
        return achouAluno || achouEvento; })
     setBuscaNaLista(busca);
     if (busca.length === 0)
        {setProcurando(false)}}
   else {
     setProcurando(false)}
}

const deletar = () => {
    setProcurando(false);
    setNomeouevento('');
}

const apagarParticipante = () => {

}

const editarParticipante = (e) => {
  e.preventDefault();
}

return (
<div>
    <div className='megablocopurple'
         style = {{userSelect: 'none',
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',}}>

        <div style = {{display:'flex',
                       alignItems: 'center',
                       flexDirection:'row',}}>

            <button className='buttonvlt2'
                    style = {{marginRight: '100px'}}
                    onClick = {voltarAbaLobby}>
                  
                  <div className='buttonvoltando'>
                    Voltar
                  </div>

            </button>

            <h1 className = 'letreiro5'
                style = {{margin: '0 auto'}}>
                CERTIFICADOS
            </h1>

            <div className = 'procurando2'
                    style = {{userSelect: 'none',
                              marginLeft:'200px'}}>

                    <form onSubmit = {procurarParticipantes}
                          style = {{display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'}}>

                        <button type = 'submit'
                                style = {{border: 'none',
                                          color: '#00000000',
                                          cursor: 'pointer',
                                          backgroundColor: '#00000000',}}>

                            <img src={lupa}
                                    style={{marginRight:'10px',
                                            width:'38px',}}/>
                        </button>

                        <input type = "text"
                               value = {nomeouevento}
                               onChange = {(nomeouevento) => setNomeouevento(nomeouevento.target.value)}
                               placeholder='Procure por Aluno ou Evento'
                               className = 'campo4'></input>

                        <button onClick = {deletar}
                                style = {{border: 'none',
                                          cursor: 'pointer',
                                          backgroundColor: '#00000000',}}>

                               <h1 style = {{marginLeft:'10px',
                                             fontFamily:'inherit',
                                             fontSize:'20px'}}>X</h1>
                        </button>

                    </form>
            </div>

            <button onClick = {addpartrue}
                    style = {{marginLeft:'20px',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                    <img src={add}
                         style = {{width:'50px'}}/>
            </button>

        </div>
    </div>
    
    <div style={{maxWidth: '1200px',
                 margin: '0 auto',}}>
        <div style = {{userSelect: 'none',
                       marginTop:'50px',
                       display: 'flex',
                       flexDirection: 'row',
                       justifyContent: 'center'}}>
            <div className='letreiro4' style = {{flex: 1}}>ALUNO</div>
            <div className='letreiro4' style = {{flex: 1}}>EVENTO</div>
            <div className='letreiro4' style = {{flex: 1}}>HORAS</div>
            <div className='letreiro4' style = {{flex: 1}}>AÇÕES</div>
        </div>
    </div>

    <div style = {{maxHeight: 'calc(90vh - 150px)',
                   overflowY: 'auto',
                   maxWidth: '1200px',
                   margin: '0 auto',}}>

        {!procurando && listaCertificados.map((user) => (
          <div key={user.id} style={{display: 'flex', 
                                     alignItems: 'center',
                                     padding: '10px 0px',
                                     borderBottom: '3px solid #ccc'}}>

            <div className = 'nomeFlex'>{user.nome_user}</div>
            <div className = 'nomeFlex'>{user.titulo_evento}</div>
            <div className = 'nomeFlex'>{user.carga_horaria}h</div>
            <div style={{flex: 1}}>
              <button onClick = {() => deletartrue(user)}
                      style={{userSelect: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                <img src={excluir}/>

              </button>
              <button onClick = {() => editartrue(user)}
                      style={{userSelect: 'none',
                              marginLeft:'20px',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                <img src={editar}/>
              </button>
            </div>
          </div>))}

        {procurando && buscanalista.map((user) => (
          <div key={user} style={{display: 'flex', 
                                     alignItems: 'center',
                                     padding: '10px 0px',
                                     borderBottom: '3px solid #ccc'}}>
            
            <div className = 'nomeFlex'>{user.nome_user}</div>
            <div className = 'nomeFlex'>{user.titulo_evento}</div>
            <div className = 'nomeFlex'>{user.carga_horaria}h</div>
            <div style={{flex: 1}}>
              <button onClick = {() => deletartrue(user)}
                      style={{userSelect: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                <img src={excluir}/>

              </button>
              <button onClick = {() => editartrue(user)}
                      style={{userSelect: 'none',
                              marginLeft:'20px',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                <img src={editar}/>
              </button>
            </div>
          </div>))}
    </div>
    
    {janelaAdicionar &&
      <div className='overlay'>
        
        <div className='trymodal'
            style = {{display:'flex',
                      flexDirection:'column',}}>

          <button onClick={desaddpartrue}
                  className = 'buttonvlt'>
              <img style = {{width: '25px'}} src={sair}/>
          </button>     

          <h1 className = 'letreiro3'
              style = {{userSelect:'none'}}
              >ADICIONAR CERTIFICADO
          </h1>

          <form onSubmit={adicionarcertificado}
                style = {{display:'flex',
                          userSelect: 'none',
                          flexDirection:'column',
                          alignItems: 'center'}}>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>ID do Aluno:</h1>
                  <input type = "text"
                        value = {id_aluno}
                        onChange={(e) => {const dig = e.target.value;
                                          const tig = dig.replace(/\D/g, '') 
                                          setAluno(tig);}}
                        className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>ID do Evento:</h1>
                  <input type = "text"
                         value={id_evento}
                         onChange={(e) => {const dig = e.target.value;
                                          const tig = dig.replace(/\D/g, '') 
                                          setEvento(tig);}}
                         className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Horas:</h1>
                  <input type = "text"
                        value={horas}
                        onChange={(e) => {const dig = e.target.value;
                                          const tig = dig.replace(/\D/g, '');
                                          if (tig.length <= 3) 
                                          {setHoras(tig);}}}
                                        
                        className = 'campoadd'>
                  </input>
            </div>

            <button className='buttonvlt'>
            </button>

            <button type = 'submit'
                    className='buttonenviar'>
              Adicionar
            </button>
          </form>
        </div>
      </div>
    }

    {janelaEditar &&
      <div className='overlay'>
        <div className='trymodal'
            style = {{display:'flex',
                      flexDirection:'column',}}>

          <button onClick={editarfalse}
                  className = 'buttonvlt'>
              <img style = {{width: '25px'}} src={sair}/>
          </button>     

          <h1 className = 'letreiro3'
              style = {{userSelect:'none'}}
              >EDITAR CERTIFICADO
          </h1>

          <form onSubmit={editarCertificado}
                style = {{display:'flex',
                          userSelect: 'none',
                          flexDirection:'column',
                          alignItems: 'center'}}>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>ID do Aluno:</h1>
                  <input type = "text"
                        value = {id_aluno_edicao}
                        onChange={(e) => {const dig = e.target.value;
                                          const tig = dig.replace(/\D/g, '') 
                                          setAluno_edicao(tig);}}
                        className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>ID do Evento:</h1>
                  <input type = "text"
                         value={id_evento_edicao}
                         onChange={(e) => {const dig = e.target.value;
                                          const tig = dig.replace(/\D/g, '') 
                                          setEvento_edicao(tig);}}
                         className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Horas:</h1>
                  <input type = "text"
                        value={horas_edicao}
                        onChange={(e) => {const dig = e.target.value;
                                          const tig = dig.replace(/\D/g, '');
                                          if (tig.length <= 3) 
                                          {setHoras_edicao(tig);}}}
                                        
                        className = 'campoadd'>
                  </input>
            </div>

            <button className='buttonvlt'>
            </button>

            <button type = 'submit'
                    className='buttonenviar'>
              Editar
            </button>
          </form>
        </div>
      </div>
    }

    {janelaDeletar &&
      <div className='overlay'>
        <div className='trymodal'
            style = {{display:'flex',
                      flexDirection:'column',}}>

          <button onClick={deletarfalse}
                  className = 'buttonvlt'>
              <img style = {{width: '25px'}} src={sair}/>
          </button>     

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
              }}
              >DELETAR CERTIFICADO
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'30px'}}
              >Aluno: {nome_aluno_deletando}
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'0px'}}
              >Evento: {nome_evento_deletando}
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'0px'}}
              >Horas: {horas_deletando}
          </h1>

          <button onClick={deletarCertificado}
                  className='buttonenviar'
                  style = {{position: 'absolute',
                            top: '75%',
                            left: '38%',}}>
              Deletar
          </button>
        </div>
      </div>
    }

</div>
 )
}