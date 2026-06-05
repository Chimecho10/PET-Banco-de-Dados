import React, { useState } from 'react';

export default function Aba_Inicial({ir, 
                                     sigin, 
                                     login,
                                     petlogo,
                                     usuario, 
                                     setSenha, 
                                     setUsuario, 
                                     senha}){
return(
<div>
    <button onClick={ir}
            style = {{position: 'absolute',
                    justifyContent:'center'}}>
    Ir</button>
    <div style = {{display:'flex',
                    alignItems: 'center',
                    justifyContent:'center',
                    flexDirection: 'row',
                    userSelect: 'none',
                    marginLeft:'60px'}}>

    <div style = {{marginTop:'200px'}}>

        <div style = {{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'}}>
        
        <div className='gerenciamento'
            style = {{marginBottom:'15px',
                        color:'#000000'
        }}>GERENCIAMENTO DE</div>

        <div className='gerenciamento'
            style = {{marginBottom:'-50px',
                        color:'#000000'
        }}>CERTIFICADOS PET</div>

        <div className= 'letreiro'>Login</div>

        <form onSubmit = {login}>
            <div className= 'discoInput'
                style = {{marginTop: '7px'}}>

            <div className= 'letreiroDiscoInput'
            >Usuário:</div>

            <input type = "text"
                    value = {usuario}
                    onChange = {(user) => setUsuario(user.target.value)}
                    className = 'campo1'>   
            </input>

            </div>

            <div className= 'discoInput'
                style = {{marginTop:'8px'}}>

            <div className= 'letreiroDiscoInput'
            >Senha:</div>

            <input type = "password"
                    value = {senha}
                    onChange = {(senha) => setSenha(senha.target.value)}
                    className = 'campo2'>   
            </input>

            </div>

        </form>

        <button onClick = {sigin}
                    style = {{marginTop:'8px',
                            border:'none',
                            cursor: 'pointer',
                            outline:'none',
                            userSelect: 'none',
                            backgroundColor: '#f6f6f600',
            }}>
            <div className = 'botaoCadastro'
                    style = {{display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            userSelect: 'none',
                    }}>
                
                <h1 style = {{
                            marginTop: '28px',
                            fontFamily: 'Montserrat',
                            fontSize: '25px',
                            userSelect: 'none',
                }}>
                Novo Cadastro</h1>
            </div>
            </button>

        <hr style = {{color: '#000000',
                        backgroundColor: '#000000',
                        height:'1px',
                        width:'300px',
                        marginTop:'0px',
                        userSelect: 'none',}}>
        </hr>
        </div>   

    </div>
    <div style = {{userSelect:'none',
                    marginTop:'200px',
                    marginLeft:'200px',
    }}>
    <img src={petlogo}/>
    </div>
    </div>
    <div style={{display:'flex',
                    alignItems: 'center',
                    justifyContent:'center',
                    flexDirection: 'column'}}>
        <div className='universidade'
            style = {{display: 'flex',
                    marginTop: '30px',
                    color:'#000000'
        }}>UNIVERSIDADE FEDERAL DO CEARÁ</div>

        <div className='universidade'
            style = {{color:'#000000'
        }}>UFC</div> 

    </div>
</div>)}