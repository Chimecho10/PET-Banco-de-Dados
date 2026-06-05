import React, { useState } from 'react'

import lupa from '../assets/imagens/lupa.png'
import add from '../assets/imagens/adicionar_participantes.png'
import editar from '../assets/imagens/editarparticipante.png'
import excluir from '../assets/imagens/excluirparticipante.png'

export default function Aba_Participantes({addpartrue})
{

const [nomeoucpf, setNomeoucpf] = useState(''); 
const [procurando, setProcurando] = useState(false);
const [buscanalista, setBuscaNaLista] = useState(null);

// LISTA DE TESTE É A VARIÁVEL RECEBE TODOS OS USUÁRIOS/PARTICIPANTES QUE ESTÃO NO BANCO DE DADOS
// NOME E CPF SÃO AS SUB-VARIÁVEIS USADAS PARA ACESSAR O USUÁRIO
const listaDeTeste = [
  { id: 1, nome: "Francisco Samuel de Souza Silva", cpf: "111.222.333-44" },
  { id: 2, nome: "Aline Rios", cpf: "555.666.777-88" },
  { id: 3, nome: "Piter Costa", cpf: "999.888.777-66" },
  { id: 4, nome: "Mauricio", cpf: "123.456.789-00" },
  { id: 5, nome: "Cesar Chicote", cpf: "000.000.000-00" },
  { id: 6, nome: "Calebe Curumirim", cpf: "111.111.111-11" },
  { id: 7, nome: "Leonardo Gaspar", cpf: "222.222.222-22" },
  { id: 8, nome: "Francisco Samuel de Souza Silva", cpf: "111.222.333-44" },
  { id: 9, nome: "Aline Rios", cpf: "555.666.777-88" },
  { id: 10, nome: "Francisco Samuel de Souza Silva", cpf: "111.222.333-44" },
  { id: 11, nome: "Aline Rios", cpf: "555.666.777-88" },
  { id: 12, nome: "Piter Costa", cpf: "999.888.777-66" },
  { id: 13, nome: "Mauricio", cpf: "123.456.789-00" },
  { id: 14, nome: "Cesar Chicote", cpf: "000.000.000-00" },
  { id: 15, nome: "Calebe Curumirim", cpf: "111.111.111-11" },
  { id: 16, nome: "Leonardo Gaspar", cpf: "222.222.222-22" },
  { id: 17, nome: "Francisco Samuel de Souza Silva", cpf: "111.222.333-44" },
  { id: 18, nome: "Aline Rios", cpf: "555.666.777-88" },
];

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

const apagarParticipante = () => {

}

const editarParticipante = () => {

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
    
    <div style={{maxWidth: '1000px',
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
                   maxWidth: '1000px',
                   margin: '0 auto',}}>

        {!procurando && listaDeTeste.map((user) => (
          <div key={user.id} style={{display: 'flex', 
                                     alignItems: 'center',
                                     padding: '20px 0px',
                                     borderBottom: '3px solid #ccc'}}>
            
            <div className = 'nomeFlex'>{user.nome}</div>
            <div className = 'nomeFlex'>{user.cpf}</div>
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
                                     padding: '20px 0px',
                                     borderBottom: '3px solid #ccc'}}>
            
            <div className = 'nomeFlex'>{user.nome}</div>
            <div className = 'nomeFlex'>{user.cpf}</div>
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
    

</div>
 )
}