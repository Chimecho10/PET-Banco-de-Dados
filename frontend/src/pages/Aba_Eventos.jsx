import React, { useState } from 'react'
import lupa from '../assets/imagens/lupa.png'
import adicionar from '../assets/imagens/adicionar.png'

export default function Aba_Eventos({procurarEvento,
                                     nomeDoEvento,
                                     setNomeDoEvento,
                                     adicionarEvento,})
{
return (
      <div>
        <div style = {{display:'flex',
                        flexDirection:'row',
                        justifyContent:'center'}}>
          <div style = {{marginTop: '80px',
                          marginRight: '150px',
                          marginLeft: '200px',
                          userSelect: 'none',
            }}>
            <h1 className = 'letreiro3'
                style = {{marginBottom: '0px'}}        
                >EVENTOS</h1>
            <hr className = 'linhavermelha'
                style = {{marginTop: '0px'}} />
          </div>
          <div className = 'procurando'
                style = {{userSelect: 'none',
                          marginLeft: '20px',
                          marginTop: '105px',}}>
              <form submit={procurarEvento}
                    style = {{display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center'}}>
                <input type = "text"
                        value = {nomeDoEvento}
                        placeholder='Procure Um Evento...'
                        onChange = {(nomeDoEvento) => setNomeDoEvento(nomeDoEvento.target.value)}
                        className = 'campo3'></input>
                <div className = 'linhavertical'></div>
                <button type = 'submit'
                        style = {{border: 'none',
                                  color: '#00000000',
                                  cursor: 'pointer',
                                  backgroundColor: '#00000000',}}>
                  <img src={lupa} style = {{width: '25px',
                                            marginLeft: '-5px'}}/>
                </button>
              </form>
          </div>
          <div>
            <button  onClick = {adicionarEvento}
                      style = {{marginTop: '109px',
                                marginLeft: '20px',
                                userSelect: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: '#00000000',}}>
              <img src={adicionar}/> 

            </button>
          </div>
        </div>
        <div style = {{display: 'flex',
                       flexDirection: 'row',
                       marginTop: '50px',
                       gap: '90px',
                       justifyContent: 'center'}}>
          <div className='letreiro4'>EVENTO</div>
          <div className='letreiro4'>DATA DE INÍCIO</div>
          <div className='letreiro4'>DATA DE TÉRMINO</div>
          <div className='letreiro4'>AÇÕES</div>
        </div>
      </div>
    )
}