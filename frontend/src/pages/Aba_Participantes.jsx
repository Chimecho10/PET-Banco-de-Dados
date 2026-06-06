import React, { useState } from 'react'

import lupa from '../assets/imagens/lupa.png'
import add from '../assets/imagens/adicionar_participantes.png'
import editar from '../assets/imagens/editarparticipante.png'
import excluir from '../assets/imagens/excluirparticipante.png'
import sair from '../assets/imagens/sair.png'

export default function Aba_Participantes({voltarAbaLobby})
{

// VARIÁVEIS DE EDITAR PARTICIPANTE
const [janelaEditar, setJanelaEditar] = useState(null);
const [nome_edicao, setNome_edicao] = useState('');
const [cpf_edicao, setCpf_edicao] = useState('');
const [username_edicao, setUsername_edicao] = useState('');
const [id_part, setId_part] = useState('');

  const editartrue = (user) =>
   {//ID DO ALUNO QUE ESTÁ SENDO EDITADO
    setId_part(user.id);

    //INFORMAÇÕES DO PARTICIPANTE PARA EDITAR
    setUsername_edicao(user.user);
    setNome_edicao(user.nome);
    setCpf_edicao(user.cpf.replace(/\D/g, ''));
    setJanelaEditar(true);}

  const editarfalse = (e) =>
    {e.preventDefault()
     setJanelaEditar(false);}

  const editarPart = (e) =>
    { e.preventDefault()
      // INTEGRAR COM O BACKEND (EDIÇÃO DE CERTIFICADO)
    }

// DELETAR CERTIFICADO
const [janelaDeletar, setJanelaDeletar] = useState(null);
const [id_deletando, setId_deletando] = useState(null);
const [username_deletando, setUsername_deletando] = useState('');
const [nome_deletando, setNome_deletando] = useState('');
const [cpf_deletando, setCpf_deletando] = useState('');

  const deletartrue = (user) =>
   {setId_deletando(user.id)
    setNome_deletando(user.nome)
    setUsername_deletando(user.user)
    setCpf_deletando(user.cpf)
    setJanelaDeletar(true);}

  const deletarfalse = (e) =>
  {e.preventDefault()
    setJanelaDeletar(false);}

  const deletarPart = (e) => {
    e.preventDefault()

    // INTEGRAR COM O BACKEND (DELETAR CERTIFICADO)


    setJanelaDeletar(false);
  }


// VARIÁVEIS DE ADICIONAR PARTICIPANTE 
const [janelaAdicionar, setJanelaAdicionar] = useState(null);
const [username, setUsername] = useState('');
const [nome, setNome] = useState('');
const [cpf, setCpf] = useState('');

// VARIÁVEIS DE BUSCA
const [nomeoucpf, setNomeoucpf] = useState(''); 
const [procurando, setProcurando] = useState(false);
const [buscanalista, setBuscaNaLista] = useState(null);

// LISTA DE TESTE É A VARIÁVEL RECEBE TODOS OS USUÁRIOS/PARTICIPANTES QUE ESTÃO NO BANCO DE DADOS
// NOME E CPF SÃO AS SUB-VARIÁVEIS USADAS PARA ACESSAR O USUÁRIO
const listaDeTeste = [
  { id: 1, user: "chimecho", nome: "Francisco Samuel de Souza Silva", cpf: "111.222.333-44" },
  { id: 2, user: "aline", nome: "Aline Rios", cpf: "555.666.777-88" },
  { id: 3, user: "piter", nome: "Piter Costa", cpf: "999.888.777-66" },
  { id: 4, user: "mauricio", nome: "Mauricio", cpf: "123.456.789-00" },
  { id: 5, user: "cesar", nome: "Cesar Chicote", cpf: "000.000.000-00" },
  { id: 6, user: "cal", nome: "Calebe Curumirim", cpf: "111.111.111-11" },
  { id: 7, user: "leo", nome: "Leonardo Gaspar", cpf: "222.222.222-22" },
];

//CONECTAR COM BACKEND
const addpartrue = () => {
  setJanelaAdicionar(true);
}

//CONECTAR COM BACKEND
const desaddpartrue = () => {
  setCpf('');
  setNome('');
  setUsername('');
  setJanelaAdicionar(false);
}

const adicionarparticipante = (e) => {
  e.preventDefault()
  if (username === '' || cpf === '' || nome === '')
    {alert("Espaço em Branco!")}
  else if (cpf.length !== 11)
    {alert("CPF Inválido!")}
  else if (listaDeTeste.find((user) => user.cpf.replace(/\D/g, '').includes(cpf)))
    {alert("CPF já consta nos participantes")}
  else if (listaDeTeste.find((user) => user.user.toLowerCase().includes(username.toLowerCase())))
    {alert("Usuário já consta nos participantes");}
  else if (listaDeTeste.find((user) => user.user.toLowerCase().includes(username.toLowerCase())))
    {alert("Usuário já consta nos participantes");}

  //CONECTAR COM BACKEND A PARTIR DAQUI
  else {
    const resposta = true;

    //BACKEND AQUI


    if (resposta)
      {alert("Participante Adicionado!");}
    else 
      {alert("Erro Interno");}
  }
}

const procurarParticipantes = (e) => {
  e.preventDefault();
  if (nomeoucpf !== '')
    {setProcurando(true);
     const busca = listaDeTeste.filter((user) => {
        const achouNome = user.nome.toLowerCase().includes(nomeoucpf.toLowerCase());
        const achouCpf = user.cpf.replace(/\D/g, '').includes(nomeoucpf.toLowerCase());
        return achouNome || achouCpf; })
     setBuscaNaLista(busca);}
   else {
     setProcurando(false)}
}

const deletar = () => {
    setProcurando(false);
    setNomeoucpf('');
}


return (
<div>
    <div className='megablocored'
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
                PARTICIPANTES
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
                               value = {nomeoucpf}
                               onChange = {(nomeoucpf) => setNomeoucpf(nomeoucpf.target.value)}
                               placeholder='Procure por Nome ou CPF'
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
            <div className='letreiro4' style = {{flex: 1}}>NOME</div>
            <div className='letreiro4' style = {{flex: 1}}>CPF</div>
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
            
            <div className = 'nomeFlex'>{user.nome}</div>
            <div className = 'nomeFlex'>{user.cpf}</div>
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
            <div className = 'nomeFlex'>{user.cpf}</div>
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
              >ADICIONAR PARTICIPANTE
          </h1>

          <form onSubmit={adicionarparticipante}
                style = {{display:'flex',
                          userSelect: 'none',
                          flexDirection:'column',
                          alignItems: 'center'}}>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Usuário:</h1>
                  <input type = "text"
                        value = {username}
                        onChange = {(username) => setUsername(username.target.value)}
                        className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Nome:</h1>
                  <input type = "text"
                         value = {nome}
                         onChange = {(nome) => setNome(nome.target.value)}
                         className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>CPF:</h1>
                  <input type = "text"
                        value = {cpf}
                        onChange = {(cpf) => 
                                     {const dig = cpf.target.value;
                                      const tig = dig.replace(/\D/g, '');
                                      if (tig.length <= 11)
                                      {setCpf(tig)}}}
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
              >EDITAR PARTICIPANTE
          </h1>

          <form onSubmit={editarPart}
                style = {{display:'flex',
                          userSelect: 'none',
                          flexDirection:'column',
                          alignItems: 'center'}}>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Usuário:</h1>
                  <input type = "text"
                        value = {username_edicao}
                        onChange = {(username_edicao) => setUsername_edicao(username_edicao.target.value)}
                        className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>Nome:</h1>
                  <input type = "text"
                         value = {nome_edicao}
                         onChange = {(nome_edicao) => setNome_edicao(nome_edicao.target.value)}
                         className = 'campoadd'>
                  </input>
            </div>
            <div className='retanguloamarelo'>
                  <h1 className='letreiro6'>CPF:</h1>
                  <input type = "text"
                        value = {cpf_edicao}
                        onChange = {(cpf_edicao) => 
                                     {const dig = cpf_edicao.target.value;
                                      const tig = dig.replace(/\D/g, '');
                                      if (tig.length <= 11)
                                      {setCpf_edicao(tig)}}}
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
              >DELETAR PARTICIPANTE
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'30px'}}
              >Usuário: {username_deletando} 
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'0px'}}
              >Nome: {nome_deletando}
          </h1>

          <h1 className = 'letreiro3'
              style = {{userSelect:'none',
                        marginBottom:'0px',
                        marginTop:'0px'}}
              >CPF: {cpf_deletando}
          </h1>

          <button onClick={deletarPart}
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