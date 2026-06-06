import React, { useState } from 'react'

import lupa from '../assets/imagens/lupa.png'
import add from '../assets/imagens/adicionar_certificados.png'
import editar from '../assets/imagens/editarparticipante.png'
import excluir from '../assets/imagens/excluirparticipante.png'
import sair from '../assets/imagens/sair.png'

export default function Aba_Participantes({voltarAbaLobby})
{

// VARIÁVEIS DE ADICIONAR CERTIFICADO 
const [janelaAdicionar, setJanelaAdicionar] = useState(null);
const [id_evento, setEvento] = useState('');
const [id_aluno, setAluno] = useState('');
const [horas, setHoras] = useState('');

// VARIÁVEIS DE BUSCA
const [nomeouevento, setNomeouevento] = useState(''); 
const [procurando, setProcurando] = useState(false);
const [buscanalista, setBuscaNaLista] = useState(null);

// LISTA DE TESTE É A VARIÁVEL RECEBE TODOS CERTIFICADOS QUE ESTÃO NO BANCO DE DADOS
const listaDeTeste = [
  { id: 1, id_usuario: 12, evento: "Evento 1", horas: 20 },
  { id: 2, id_usuario: 13, evento: "GPEC", horas: 30 },
  { id: 3, id_usuario: 14, evento: "Coding", horas: 40 },
  { id: 4, id_usuario: 15, evento: "Evento 2", horas: 50 },
  { id: 5, id_usuario: 16, evento: "Evento 3", horas: 60 },
  { id: 6, id_usuario: 17, evento: "Evento 4", horas: 70 },
  { id: 7, id_usuario: 18, evento: "Evento 5", horas: 80 },
];

// REQUISITOR DE NOMES (CRIA NOVA VARIÁVEL QUE, AGORA, TEM O NOME DOS ALUNOS)
const requisitarNomeAluno = (idUsuario) => {
  const bancoDeNomes = {
    12: "Chimecho",
    13: "Maria",
    14: "Piter",
    15: "Ana",
    16: "Aline Rios",
    17: "Julia",
    18: "Pedro",};
  return bancoDeNomes[idUsuario] || "Erro ao Encontrar Aluno";
};

// listaComNomes = VARIAVEL AGORA COM NOMES
const listaComNomes = listaDeTeste.map((item) => {
    const name = requisitarNomeAluno(item.id_usuario);
    return {...item, nome_aluno: name};})

const addpartrue = () => {
  setJanelaAdicionar(true);
}

const desaddpartrue = () => {
  setEvento('');
  setAluno('');
  setJanelaAdicionar(false);
}

const adicionarevento = (e) => {
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

        {!procurando && listaDeTeste.map((user) => (
          <div key={user.id} style={{display: 'flex', 
                                     alignItems: 'center',
                                     padding: '10px 0px',
                                     borderBottom: '3px solid #ccc'}}>

            <div className = 'nomeFlex'>{requisitarNomeAluno(user.id_usuario)}</div>
            <div className = 'nomeFlex'>{user.evento}</div>
            <div className = 'nomeFlex'>{user.horas}h</div>
            <div style={{flex: 1}}>
              <button onClick = {apagarParticipante}
                      style={{userSelect: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                <img src={excluir}/>

              </button>
              <button onClick = {editarParticipante}
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
            
            <div className = 'nomeFlex'>{requisitarNomeAluno(user.id_usuario)}</div>
            <div className = 'nomeFlex'>{user.evento}</div>
            <div className = 'nomeFlex'>{user.horas}h</div>
            <div style={{flex: 1}}>
              <button onClick = {apagarParticipante}
                      style={{userSelect: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                <img src={excluir}/>

              </button>
              <button onClick = {editarParticipante}
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

          <form onSubmit={adicionarevento}
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
</div>
 )
}