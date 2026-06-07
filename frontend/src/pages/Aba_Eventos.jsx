import React, { useState, useEffect} from 'react'

import lupa from '../assets/imagens/lupa.png'
import add from '../assets/imagens/adicionar.png'
import editar from '../assets/imagens/editarparticipante.png'
import excluir from '../assets/imagens/excluirparticipante.png'
import sair from '../assets/imagens/sair.png'

import { carregarEventosAPI, adicionarEventosAPI, editarEventosAPI, deletarEventosAPI } from '../services/eventos'

export default function Aba_Participantes({voltarAbaLobby})
{

// VARIÁVEIS DE EDITAR EVENTO
const [janelaEditar, setJanelaEditar] = useState(null);
const [nome_edicao, setNome_edicao] = useState('');
const [texto_edicao, setTexto_edicao] = useState('');
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

  const editarEvento = async(e) =>
    { e.preventDefault();
      const campos = {nome_edicao, texto_edicao, data_inicio_edicao, data_termino_edicao, id_evento};
      const funcoes = {setNome_edicao, setTexto_edicao, setData_inicio_edicao, setData_termino_edicao, setId_evento};

      try{
        await editarEventosAPI(campos, funcoes);
        carregarEventosAPI({setListaDeTeste});
      }catch(error){
        console.error(error);
      }

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
    setNome_deletando(evento.titulo)
    setData_inicio_deletando(evento.data_inicio)
    setData_termino_deletando(evento.data_fim)
    setJanelaDeletar(true);}

  const deletarfalse = (e) =>
  {e.preventDefault()
    setJanelaDeletar(false);}

  const deletarEvento = async (e) => {
    try{
      await deletarEventosAPI(id_evento_deletando);
      carregarEventosAPI({setListaDeTeste});

    }catch(error){
      console.error(error);
    }


    setJanelaDeletar(false);
  }

// VARIÁVEIS DE ADICIONAR EVENTO
const [janelaAdicionar, setJanelaAdicionar] = useState(null);
const [nome, setNome] = useState('');
const [texto, setTexto] = useState('');
const [datainicio, setDatainicio] = useState('');
const [datatermino, setDatatermino] = useState('');

// VARIÁVEIS DE BUSCA
const [procurando, setProcurando] = useState(false);
const [buscanalista, setBuscaNaLista] = useState([]);;

// LISTA DE TESTE É A VARIÁVEL RECEBE TODOS OS EVENTOS QUE ESTÃO NO BANCO DE DADOS
// NOME É SUB-VARIÁVEIS USADA PARA PESQUISAR O EVENTO
const [listaDeTeste, setListaDeTeste] = useState([]);

// Este Hook executa a função carregarEventos uma vez, assim que a tela abre.
useEffect(() => {
    carregarEventosAPI({setListaDeTeste});
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

const adicionarparticipante = async (e) => {

  e.preventDefault()
  if (nome === '' || texto === '' || datainicio === '' || datatermino === '')
    {alert("Espaço em Branco!")}

  else {
    try{
      const funcoes = {setNome, setTexto, setDatainicio, setDatatermino}
      const campos = {nome, texto, datainicio, datatermino}

      await adicionarEventosAPI(campos, funcoes);
      carregarEventosAPI({setListaDeTeste});


    }catch(error){
      console.log(error);
    }

  }
}

const procurarEvento = (e) => {
    e.preventDefault();
    if (nome.trim() !== '') {
      setProcurando(true);
      const busca = listaDeTeste.filter((evento) => {
        const tituloEvento = (evento.titulo || evento.nome || '').toLowerCase();
        return tituloEvento.includes(nome.toLowerCase());
      });
      setBuscaNaLista(busca);
    } else {
      setProcurando(false);
    }
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

const formatarData = (dataISO) => {
  if (!dataISO) return '';
  const apenasData = dataISO.split('T')[0];
  const partes = apenasData.split('-'); 
  
  if (partes.length !== 3) return dataISO; 

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};


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
            <div className = 'nomeFlex'>{formatarData(evento.data_inicio)}</div>
            <div className = 'nomeFlex'>{formatarData(evento.data_fim)}</div>
            <div style={{flex: 1}}>
              <button onClick = {() => deletartrue(evento)}
                      style={{userSelect: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                <img src={excluir}/>

              </button>
              <button onClick = {() => editartrue(evento)}
                      style={{userSelect: 'none',
                              marginLeft:'20px',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                <img src={editar}/>
              </button>
            </div>
          </div>))}

        {procurando && buscanalista.map((evento) => (
          <div key={evento.id} style={{display: 'flex', 
                                     alignItems: 'center',
                                     padding: '10px 0px',
                                     borderBottom: '3px solid #ccc'}}>
            
            <div className = 'nomeFlex'>{evento.titulo}</div>
            <div className = 'nomeFlex'>{evento.texto}</div>
            <div className = 'nomeFlex'>{evento.data_inicio}</div>
            <div className = 'nomeFlex'>{evento.data_fim}</div>
            <div style={{flex: 1}}>
              <button onClick = {() => deletartrue(evento)}
                      style={{userSelect: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#00000000',}}>
                <img src={excluir}/>

              </button>
              <button onClick = {() => editartrue(evento)}
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
                <h1 className='letreiro6'>Descrição:</h1>
                <input type = "text"
                      value = {texto}
                      onChange = {(texto) => setTexto(texto.target.value)}
                      className = 'campoadd'>
                </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Início:</h1>
                  <input type = "date"
                         value = {datainicio}
                         onChange = {(datainicio) => setDatainicio(datainicio.target.value )}
                         className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Término:</h1>
                  <input type = "date"
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
                  <h1 className='letreiro6'>Texto:</h1>
                  <input type = "text"
                         value = {texto_edicao}
                         onChange = {(texto_edicao) => setTexto_edicao(texto_edicao.target.value)}
                         className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Início:</h1>
                  <input type = "date"
                         value = {data_inicio_edicao}
                         onChange = {(data_inicio_edicao) => setData_inicio_edicao(data_inicio_edicao.target.value)}
                         className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Término:</h1>
                  <input type = "DATE"
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
              >Início: {formatarData(data_inicio_deletando)}
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'0px'}}
              >Término: {formatarData(data_termino_deletando)}
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