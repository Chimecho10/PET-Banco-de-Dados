import React, { useState } from 'react';

export default function Aba_Cadastro({cadastro, 
                                      usuarioCadastro,
                                      setUsuarioCadastro,
                                      nome,
                                      setNome,
                                      senha1,
                                      senha2,
                                      setSenha1,
                                      setSenha2,
                                      cpf,
                                      setCpf,
                                      voltarAbaInicial,
                                     })
{
return (
      <div style = {{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop:'100px'}}>
            
        <div className='gerenciamento'
            style = {{marginBottom:'15px',
                      color:'#000000'
        }}>GERENCIAMENTO DE</div>

        <div className='gerenciamento'
            style = {{marginBottom:'-70px',
                      color:'#000000'
        }}>CERTIFICADOS PET</div>

        <div className= 'letreiro'>Cadastro</div>

        <form onSubmit = {cadastro}>

          <div className= 'discoInput2'
              style = {{marginTop: '-20px'}}>

            <div className= 'letreiroDiscoInput2'
            >Usuário:</div>

            <input type = "text"
                  value = {usuarioCadastro}
                  onChange = {(user) => setUsuarioCadastro(user.target.value)}
                  className = 'campo1'>   
            </input>
          </div>

          <div className= 'discoInput2'
              style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput2'
            >Nome:</div>

            <input type = "text"
                  value = {nome}
                  onChange = {(nome) => setNome(nome.target.value)}
                  className = 'campo2'>   
            </input>
          </div>

          <div className= 'discoInput2'
              style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput2'
            >CPF:</div>

            <input type = "text"
                   inputMode="numeric" 
                   pattern="[0-9]*" 
                   value = {cpf}
                   onChange = {(cpf) => 
                               {const dig = cpf.target.value;
                                const tig = dig.replace(/\D/g, '');
                                if (tig.length <= 11)
                                {setCpf(tig)}}}
                   className = 'campo2'>   
            </input>
          </div>

          <div className= 'discoInput2'
              style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput2'
            >Senha:</div>

            <input type = "password"
                  value = {senha1}
                  onChange = {(senha1) => setSenha1(senha1.target.value)}
                  className = 'campo2'>   
            </input>
          </div>

          <div className= 'discoInput2'
              style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput2'
            >Confirmação de Senha:</div>

            <input type = "password"
                  value = {senha2}
                  onChange = {(senha2) => setSenha2(senha2.target.value)}
                  className = 'campo2'>   
            </input>
          </div>

          <button onClick = {voltarAbaInicial}
                  className='cadastroVoltar'
                  style = {{marginRight: '30px'}}
          >Voltar</button>
          
          <button type = "submit"
                  className='enviarCadastro'
                  style = {{marginTop: '20px',}}
          >Enviar</button>

        </form>
      </div>
    )
}