import React, { useState, useEffect} from 'react'

import lupa from '../assets/imagens/lupa.png'
import add from '../assets/imagens/adicionar.png'
import editar from '../assets/imagens/editarparticipante.png'
import excluir from '../assets/imagens/excluirparticipante.png'
import sair from '../assets/imagens/sair.png'

import { carregarEventos } from '../services/users'

export default function Aba_Participantes({voltarAbaLobby})
{

// VARIÁVEIS DE EDITAR EVENTO
const [janelaEditar, setJanelaEditar] = useState(null);
const [nome_edicao, setNome_edicao] = useState('');
const [data_inicio_edicao, setData_inicio_edicao] = useState('');
const [data_termino_edicao, setData_termino_edicao] = useState('');
const [id_evento, setId_evento] = useState('');

  const editartrue = (evento) =>
   {//ID DO EVENTO QUE ESTÁ SENDO EDITADO
    setId_evento(evento.id);

    //INFORMAÇÕES DO EVENTO PARA EDITAR
    setNome_edicao(evento.nome);
    setData_inicio_edicao(evento.data_de_inicio)
    setData_termino_edicao(evento.data_de_termino)
    setJanelaEditar(true);}

  const editarfalse = (e) =>
    {e.preventDefault()
     setJanelaEditar(false);}

  const editarEvento = (e) =>
    { e.preventDefault()
      // INTEGRAR COM O BACKEND (EDIÇÃO DE CERTIFICADO)

      setJanelaEditar(false);
    }

// DELETAR CERTIFICADO
const [janelaDeletar, setJanelaDeletar] = useState(null);
const [id_evento_deletando, setId_evento_deletando] = useState('');
const [data_inicio_deletando, setData_inicio_deletando] = useState('');
const [data_termino_deletando, setData_termino_deletando] = useState('');
const [nome_deletando, setNome_deletando] = useState('');


  const deletartrue = (evento) =>
   {setId_evento_deletando(evento.id)
    setNome_deletando(evento.nome)
    setData_inicio_deletando(evento.data_de_inicio)
    setData_termino_deletando(evento.data_de_termino)
    setJanelaDeletar(true);}

  const deletarfalse = (e) =>
  {e.preventDefault()
    setJanelaDeletar(false);}

  const deletarEvento = (e) => {
    e.preventDefault()

    // INTEGRAR COM O BACKEND (DELETAR CERTIFICADO)


    setJanelaDeletar(false);
  }

// VARIÁVEIS DE ADICIONAR EVENTO
const [janelaAdicionar, setJanelaAdicionar] = useState(null);
const [nome, setNome] = useState('');
const [datainicio, setDatainicio] = useState('');
const [datatermino, setDatatermino] = useState('');

// VARIÁVEIS DE BUSCA
const [procurando, setProcurando] = useState(false);
const [buscanalista, setBuscaNaLista] = useState(null);

// LISTA DE TESTE É A VARIÁVEL RECEBE TODOS OS EVENTOS QUE ESTÃO NO BANCO DE DADOS
// NOME É SUB-VARIÁVEIS USADA PARA PESQUISAR O EVENTO
const [listaDeTeste, setListaDeTeste] = useState([]);

// Este Hook executa a função carregarEventos uma vez, assim que a tela abre.
useEffect(() => {
    carregarEventos({setListaDeTeste});
}, []);

//CONECTAR COM BACKEND
const addpartrue = () => {
  setJanelaAdicionar(true);
}

//CONECTAR COM BACKEND
const desaddpartrue = () => {
  setNome('');
  setDatainicio('');
  setDatatermino('');
  setJanelaAdicionar(false);
}

const adicionarparticipante = (e) => {
  e.preventDefault()
  if (nome === '' || datainicio === '' || datatermino === '')
    {alert("Espaço em Branco!")}

  //CONECTAR COM BACKEND A PARTIR DAQUI
  else {
    const resposta = true;

    //BACKEND AQUI


    if (resposta)
      {alert("Evento Adicionado!");}
    else 
      {alert("Erro Interno");}
  }
}

const procurarEvento = (e) => {
  e.preventDefault();
  if (nome !== '')
    {setProcurando(true);
     const busca = listaDeTeste.filter((evento) => {
        return evento.nome.toLowerCase().includes(nome.toLowerCase())})
     setBuscaNaLista(busca);
     if (busca.length === 0)
      {setProcurando(false)}}
   else {
     setProcurando(false)}
}

const deletar = () => {
    setProcurando(false);
    setNome('');
}

const apagarParticipante = () => {

}

const editarParticipante = (e) => {
  e.preventDefault();
}

return (
<div>
    <div className='megablocoblue'
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
                EVENTOS
            </h1>

            <div className = 'procurando2'
                    style = {{userSelect: 'none',
                              marginLeft:'200px'}}>

                    <form onSubmit = {procurarEvento}
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
                               value = {nome}
                               onChange = {(nome) => setNome(nome.target.value)}
                               placeholder='Procure por Nome do Evento'
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
    
    <div style={{maxWidth: '1600px',
                 margin: '0 auto',}}>
        <div style = {{userSelect: 'none',
                       marginTop:'50px',
                       display: 'flex',
                       flexDirection: 'row',
                       justifyContent: 'center'}}>
            <div className='letreiroX' style = {{flex: 1}}>NOME</div>
            <div className='letreiroX' style = {{flex: 1}}>DESCRIÇÃO</div>
            <div className='letreiroX' style = {{flex: 1}}>DATA DE INÍCIO</div>
            <div className='letreiroX' style = {{flex: 1}}>DATA DE TÉRMINO</div>
            <div className='letreiroX' style = {{flex: 1}}>AÇÕES</div>
        </div>
    </div>

    <div style = {{maxHeight: 'calc(90vh - 150px)',
                   overflowY: 'auto',
                   maxWidth: '1600px',
                   margin: '0 auto',}}>

        {!procurando && listaDeTeste.map((evento) => (
          <div key={evento.id} style={{display: 'flex', 
                                     alignItems: 'center',
                                     padding: '10px 0px',
                                     borderBottom: '3px solid #ccc'}}>
            
            <div className = 'nomeFlex'>{evento.titulo}</div>
            <div className = 'nomeFlex'>{evento.texto}</div>
            <div className = 'nomeFlex'>{evento.data_inicio}</div>
            <div className = 'nomeFlex'>{evento.data_fim}</div>
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
            
            <div className = 'nomeFlex'>{user.nome}</div>
            <div className = 'nomeFlex'>{user.data_de_inicio}</div>
            <div className = 'nomeFlex'>{user.data_de_termino}</div>
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
              >ADICIONAR EVENTO
          </h1>

          <form onSubmit={adicionarparticipante}
                style = {{display:'flex',
                          userSelect: 'none',
                          flexDirection:'column',
                          alignItems: 'center'}}>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Nome:</h1>
                  <input type = "text"
                        value = {nome}
                        onChange = {(nome) => setNome(nome.target.value)}
                        className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Início:</h1>
                  <input type = "text"
                         value = {datainicio}
                         onChange = {(datainicio) => setDatainicio(datainicio.target.value)}
                         className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Término:</h1>
                  <input type = "text"
                        value = {datatermino}
                        onChange = {(datatermino) => setDatatermino(datatermino.target.value)}
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
      </div>}

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
              >EDITAR EVENTO
          </h1>

          <form onSubmit={editarEvento}
                style = {{display:'flex',
                          userSelect: 'none',
                          flexDirection:'column',
                          alignItems: 'center'}}>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Nome:</h1>
                  <input type = "text"
                        value = {nome_edicao}
                        onChange = {(nome_edicao) => setNome_edicao(nome_edicao.target.value)}
                        className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Início:</h1>
                  <input type = "text"
                         value = {data_inicio_edicao}
                         onChange = {(data_inicio_edicao) => setData_inicio_edicao(data_inicio_edicao.target.value)}
                         className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Término:</h1>
                  <input type = "text"
                        value = {data_termino_edicao}
                        onChange = {(data_termino_edicao) => setData_termino_edicao(data_termino_edicao.target.value)}
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
              style = {{userSelect:'none'}}
              >DELETAR EVENTO
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'30px'}}
              >Evento: {nome_deletando} 
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'0px'}}
              >Início: {data_inicio_deletando}
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'0px'}}
              >Término: {data_termino_deletando}
          </h1>

          <button className='buttonvlt'>
          </button>

          <button onClick={deletarEvento}
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