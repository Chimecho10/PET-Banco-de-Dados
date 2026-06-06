import React, { useState } from 'react'

import lupa from '../assets/imagens/lupa.png'
import add from '../assets/imagens/adicionar_certificados.png'
import editar from '../assets/imagens/download.png'
import excluir from '../assets/imagens/excluirparticipante.png'
import sair from '../assets/imagens/sair.png'

export default function Aba_Participantes({voltarAbaLobby})
{

// VARIÁVEIS DE BUSCA
const [nomeouevento, setNomeouevento] = useState(''); 
const [procurando, setProcurando] = useState(false);
const [buscanalista, setBuscaNaLista] = useState(null);

// A LISTA É RESULTADO DE UMA BUSCA DE TODOS OS CERTIFICADOS QUE CONTÉM
// COMO ID DE USUÁRIO O MESMO QUE O ID DO USUÁRIO LOGADO
const listaDeTeste = [
  { id: 1, id_usuario: 12, id_evento: 155, evento: "Evento 1", horas: 20 },
  { id: 2, id_usuario: 13, id_evento: 157, evento: "GPEC", horas: 30 },
  { id: 3, id_usuario: 14, id_evento: 156, evento: "Coding", horas: 40 },
  { id: 4, id_usuario: 15, id_evento: 113, evento: "Evento 2", horas: 50 },
  { id: 5, id_usuario: 16, id_evento: 191, evento: "Evento 3", horas: 60 },
  { id: 6, id_usuario: 17, id_evento: 187, evento: "Evento 4", horas: 70 },
  { id: 7, id_usuario: 18, id_evento: 104, evento: "Evento 5", horas: 80 },
];

const procurarParticipantes = (e) => {
  e.preventDefault();
  if (nomeouevento !== '')
    {setProcurando(true);
     const busca = listaComNomes.filter((user) => {
        const achouEvento = user.evento.toLowerCase().includes(nomeouevento.toLowerCase());
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

        {!procurando && listaDeTeste.map((user) => (
          <div key={user} style={{display: 'flex', 
                                     alignItems: 'center',
                                     padding: '10px 0px',
                                     borderBottom: '3px solid #ccc'}}>
            <div className = 'nomeFlex'>{user.evento}</div>
            <div className = 'nomeFlex'>{user.horas}h</div>
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
            <div className = 'nomeFlex'>{user.evento}</div>
            <div className = 'nomeFlex'>{user.horas}h</div>
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