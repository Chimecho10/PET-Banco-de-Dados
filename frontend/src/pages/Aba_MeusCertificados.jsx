import React, { useState, useEffect } from 'react'

import lupa from '../assets/imagens/lupa.png'
import add from '../assets/imagens/adicionar_certificados.png'
import editar from '../assets/imagens/download.png'
import excluir from '../assets/imagens/excluirparticipante.png'
import sair from '../assets/imagens/sair.png'
import { listarCertificadosAPI } from '../services/certificados'

export default function Aba_Participantes({voltarAbaLobby})
{

// VARIÁVEIS DE BUSCA
const [nomeouevento, setNomeouevento] = useState(''); 
const [procurando, setProcurando] = useState(false);
const [buscanalista, setBuscaNaLista] = useState(null);

// A LISTA É RESULTADO DE UMA BUSCA DE TODOS OS CERTIFICADOS QUE CONTÉM
// COMO ID DE USUÁRIO O MESMO QUE O ID DO USUÁRIO LOGADO
const [listaCertificados, setListaCertificados] = useState([]);

useEffect(() => {
    listarCertificadosAPI({setListaCertificados});
}, []);

const procurarParticipantes = (e) => {
  e.preventDefault();
  if (nomeouevento !== '')
    {setProcurando(true);
     const busca = listaCertificados.filter((user) => {
        const achouEvento = user.titulo_evento.toLowerCase().includes(nomeouevento.toLowerCase());
        return achouEvento})
     setBuscaNaLista(busca);
     if (busca.length === 0)
        {setProcurando(false)}}
   else {
     setProcurando(false)}
}

const deletar = () => 
    {setProcurando(false);
     setNomeouevento('');}

return (
<div>
    <div className='megablocogreen'
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
                style = {{margin: '0 auto',
                          whiteSpace: 'nowrap',
                }}>
                MEUS CERTIFICADOS
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
                               placeholder='Procure por Evento'
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
        </div>
    </div>
    
    <div style={{maxWidth: '1000px',

                 margin: '0 auto',}}>
        <div style = {{userSelect: 'none',
                       marginTop:'50px',
                       display: 'flex',
                       flexDirection: 'row',
                       justifyContent: 'center'}}>
            <div className='letreiro4' style = {{flex: 1}}>EVENTO</div>
            <div className='letreiro4' style = {{flex: 1}}>HORAS</div>
            <div className='letreiro4' style = {{flex: 1}}>DOWNLOAD</div>
        </div>
    </div>

    <div style = {{maxHeight: 'calc(90vh - 150px)',
                   overflowY: 'auto',
                   maxWidth: '1000px',
                   margin: '0 auto',}}>

        {!procurando && listaCertificados.map((user) => (
          <div key={user.id} style={{display: 'flex', 
                                     alignItems: 'center',
                                     padding: '10px 0px',
                                     borderBottom: '3px solid #ccc'}}>
            <div className = 'nomeFlex'>{user.titulo_evento}</div>
            <div className = 'nomeFlex'>{user.carga_horaria}h</div>
              <div style={{flex: 1}}>
                <button onClick = {() => download(user)}
                        style={{userSelect: 'none',
                                marginLeft:'20px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: '#00000000',}}>
                  <img style = {{width: '35px'}}src={editar}/>
                </button>
              </div>
          </div>))}

        {procurando && buscanalista.map((user) => (
          <div key={user} style={{display: 'flex', 
                                     alignItems: 'center',
                                     padding: '10px 0px',
                                     borderBottom: '3px solid #ccc'}}>
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
                <img style = {{width: '35px'}}src={editar}/>
              </button>
            </div>
          </div>))}
    </div>
</div>
 )
}