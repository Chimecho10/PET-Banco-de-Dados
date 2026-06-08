import React, { useState, useEffect } from 'react'

import lupa from '../assets/imagens/lupa.png'
import add from '../assets/imagens/adicionar_certificados.png'
import editar from '../assets/imagens/editarparticipante.png'
import excluir from '../assets/imagens/excluirparticipante.png'
import sair from '../assets/imagens/sair.png'
import { 
  listarCertificadosAllAPI, 
  cadastrarCertificadoAPI, 
  atualizarCertificadoAPI, 
  deletarCertificadoAPI 
} from '../services/certificados'
import { carregarParticipantesAPI } from '../services/participantes'
import { carregarEventosAPI } from '../services/eventos'

export default function Aba_Participantes({voltarAbaLobby})
{

// VARIÁVEIS DE CONTROLE GLOBAL
const [idCertificadoSelecionado, setIdCertificadoSelecionado] = useState(null);

// VARIÁVEIS DE ADICIONAR CERTIFICADO 
const [janelaAdicionar, setJanelaAdicionar] = useState(null);
const [id_evento, setEvento] = useState('');
const [id_aluno, setAluno] = useState('');
const [horas, setHoras] = useState('');

  const addpartrue = () =>
    {setJanelaAdicionar(true);}
  

  const desaddpartrue = () => 
   {setEvento('');
    setAluno('');
    setHoras('');
    setJanelaAdicionar(false);}

// VARIÁVEIS DE EDITAR CERTIFICADO
const [janelaEditar, setJanelaEditar] = useState(null);
const [id_evento_edicao, setEvento_edicao] = useState('');
const [id_aluno_edicao, setAluno_edicao] = useState('');
const [horas_edicao, setHoras_edicao] = useState('');

  const editartrue = (cert) => {
    setIdCertificadoSelecionado(cert.id); 
    setAluno_edicao(cert.id_usuario);
    setEvento_edicao(cert.id_evento);
    setHoras_edicao(cert.carga_horaria); 
    setJanelaEditar(true);
  }

  const editarfalse = (e) => {
    e.preventDefault();
    setJanelaEditar(false);
  }

  const editarCertificado = async (e) => {
    e.preventDefault();
    if (horas_edicao === '') {
      alert("Por favor, preencha a carga horária.");
      return;
    }

    const dadosAtualizados = {
      id_user: parseInt(id_aluno_edicao),
      id_evento: parseInt(id_evento_edicao),
      carga_horaria: parseInt(horas_edicao)
    };

    const sucesso = await atualizarCertificadoAPI(idCertificadoSelecionado, dadosAtualizados);

    if (sucesso) {
      alert("Certificado Atualizado!");
      setJanelaEditar(false);
      listarCertificadosAllAPI(setListaCertificados); // Recarrega listagem principal
    } else {
      alert("Erro ao atualizar certificado.");
    }
  }

// DELETAR CERTIFICADO
const [janelaDeletar, setJanelaDeletar] = useState(null);
const [nome_aluno_deletando, setNome_aluno_deletando] = useState('');
const [nome_evento_deletando, setNome_evento_deletando] = useState('');
const [horas_deletando, setHoras_deletando] = useState(null);

  const deletartrue = (cert) => {
    setIdCertificadoSelecionado(cert.id); 
    setNome_aluno_deletando(cert.nome_user);
    setNome_evento_deletando(cert.titulo_evento);
    setHoras_deletando(cert.carga_horaria);
    setJanelaDeletar(true);
  }

  const deletarfalse = (e) => {
    e.preventDefault();
    setJanelaDeletar(false);
  }

  const deletarCertificado = async (e) => {
    e.preventDefault();

    const sucesso = await deletarCertificadoAPI(idCertificadoSelecionado);

    if (sucesso) {
      alert("Certificado Deletado!");
      listarCertificadosAllAPI( setListaCertificados ); 
    } else {
      alert("Erro ao deletar certificado.");
    }
    setJanelaDeletar(false);
  }

// VARIÁVEIS DE BUSCA
const [nomeouevento, setNomeouevento] = useState(''); 
const [procurando, setProcurando] = useState(false);
const [buscanalista, setBuscaNaLista] = useState(null);

//Listagem das entidades
const [listaCertificados, setListaCertificados] = useState([]);
const [todosParticipantes, setTodosParticipantes] = useState([]);
const [todosEventos, setTodosEventos] = useState([]);

// Carregando todas as informações necessárias ao iniciar a tela
useEffect(() => {
    listarCertificadosAllAPI( setListaCertificados );
  
    carregarParticipantesAPI(setTodosParticipantes);
    
    carregarEventosAPI({ setListaDeTeste: setTodosEventos });
}, []);

const adicionarcertificado = async (e) => {
  e.preventDefault();
  
  if (id_evento === '' || id_aluno === '' || horas === '') {
    alert("Espaço em Branco!");
    return;
  }

  const novoCertificado = {
    id_evento: parseInt(id_evento),
    id_user: parseInt(id_aluno),    
    carga_horaria: parseInt(horas)   
  };
  const sucesso = await cadastrarCertificadoAPI(novoCertificado);

  if (sucesso) {
    alert("Certificado Adicionado!");
    desaddpartrue();
    listarCertificadosAllAPI( setListaCertificados ); 
  } else {
    alert("Erro Interno ao Cadastrar");
  }
}

const procurarParticipantes = (e) => {
  e.preventDefault();
  if (nomeouevento !== '') {
     setProcurando(true);
     const busca = listaCertificados.filter((user) => {
        const achouAluno = user.nome_user?.toLowerCase().includes(nomeouevento.toLowerCase());
        const achouEvento = user.titulo_evento?.toLowerCase().includes(nomeouevento.toLowerCase());
        return achouAluno || achouEvento; 
     });
     setBuscaNaLista(busca);
     if (busca.length === 0) {
        setProcurando(false);
     }
  } else {
     setProcurando(false);
  }
}

const deletar = () => {
    setProcurando(false);
    setNomeouevento('');
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
    </div>
    
    {janelaAdicionar &&
      <div className='overlay'>
        <div className='trymodal' style = {{display:'flex', flexDirection:'column'}}>

          <button onClick={desaddpartrue} className = 'buttonvlt'>
              <img style = {{width: '25px'}} src={sair}/>
          </button>     

          <h1 className = 'letreiro3' style = {{userSelect:'none'}}>ADICIONAR CERTIFICADO</h1>

          <form onSubmit={adicionarcertificado}
                style = {{display:'flex', userSelect: 'none', flexDirection:'column', alignItems: 'center'}}>
            
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Participante:</h1>
                  <select 
                    value={id_aluno} 
                    onChange={(e) => setAluno(e.target.value)}
                    className='campoadd'
                    style={{backgroundColor: 'white', border: '1px solid #ccc', padding: '5px', borderRadius: '5px', width: '100%', height: '35px'}}
                  >
                    <option value=""></option>
                    {todosParticipantes.map((part) => (
                      <option key={part.id} value={part.id}>
                        {part.nome}
                      </option>
                    ))}
                  </select>
            </div>

            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Evento:</h1>
                  <select 
                    value={id_evento} 
                    onChange={(e) => setEvento(e.target.value)}
                    className='campoadd'
                    style={{backgroundColor: 'white', border: '1px solid #ccc', padding: '5px', borderRadius: '5px', width: '100%', height: '35px'}}
                  >
                    <option value=""></option>
                    {todosEventos.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.titulo}
                      </option>
                    ))}
                  </select>
            </div>

            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Horas:</h1>
                  <input type = "text"
                        value={horas}
                        onChange={(e) => {const dig = e.target.value;
                                          const tig = dig.replace(/\D/g, '');
                                          if (tig.length <= 3) {setHoras(tig);}}}
                        className = 'campoadd'>
                  </input>
            </div>

            <button type = 'submit' className='buttonenviar' style={{marginTop: '20px'}}>
              Adicionar
            </button>
          </form>
        </div>
      </div>
    }

    {janelaEditar &&
      <div className='overlay'>
        <div className='trymodal' style = {{display:'flex', flexDirection:'column'}}>

          <button onClick={editarfalse} className = 'buttonvlt'>
              <img style = {{width: '25px'}} src={sair}/>
          </button>     

          <h1 className = 'letreiro3' style = {{userSelect:'none'}}>EDITAR CERTIFICADO</h1>

          <form onSubmit={editarCertificado}
                style = {{display:'flex', userSelect: 'none', flexDirection:'column', alignItems: 'center'}}>
            
            <div className='retanguloamarelo' style={{opacity: 0.7}}>
                  <h1 className='letreiro6'>Aluno:</h1>
                  <input type = "text"
                        value = {listaCertificados.find(c => c.id === idCertificadoSelecionado)?.nome_user || ''}
                        disabled
                        className = 'campoadd'
                        style={{backgroundColor: '#e0e0e0', cursor: 'not-allowed'}}>
                  </input>
            </div>


            <div className='retanguloamarelo' style={{opacity: 0.7}}>
                  <h1 className='letreiro6'>Evento:</h1>
                  <input type = "text"
                         value={listaCertificados.find(c => c.id === idCertificadoSelecionado)?.titulo_evento || ''}
                         disabled
                         className = 'campoadd'
                         style={{backgroundColor: '#e0e0e0', cursor: 'not-allowed'}}>
                  </input>
            </div>


            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Horas:</h1>
                  <input type = "text"
                        value={horas_edicao}
                        onChange={(e) => {const dig = e.target.value;
                                          const tig = dig.replace(/\D/g, '');
                                          if (tig.length <= 3) {setHoras_edicao(tig);}}}
                        className = 'campoadd'>
                  </input>
            </div>

            <button type = 'submit' className='buttonenviar' style={{marginTop: '20px'}}>
              Editar
            </button>
          </form>
        </div>
      </div>
    }

    {janelaDeletar &&
      <div className='overlay'>
        <div className='trymodal' style = {{display:'flex', flexDirection:'column'}}>

          <button onClick={deletarfalse} className = 'buttonvlt'>
              <img style = {{width: '25px'}} src={sair}/>
          </button>     

          <h1 className = 'letreiro3' style = {{userSelect:'none'}}>DELETAR CERTIFICADO</h1>

          <h1 className = 'letreiro3' style = {{userSelect:'none', marginBottom:'0px', marginTop:'30px'}}>
              Aluno: {nome_aluno_deletando}
          </h1>

          <h1 className = 'letreiro3' style = {{userSelect:'none', marginBottom:'0px', marginTop:'0px'}}>
              Evento: {nome_evento_deletando}
          </h1>

          <h1 className = 'letreiro3' style = {{userSelect:'none', marginBottom:'0px', marginTop:'0px'}}>
              Horas: {horas_deletando}h
          </h1>

          <button onClick={deletarCertificado}
                  className='buttonenviar'
                  style = {{position: 'absolute', top: '75%', left: '38%'}}>
              Deletar
          </button>
        </div>
      </div>
    }

</div>
 )
}