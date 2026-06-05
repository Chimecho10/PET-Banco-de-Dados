import React, { useState } from 'react';

export default function Aba_Lobby({eventos,
                                   participantes,
                                   certificados,        
                                   petlogo2}
)
{
return (
      <div>
        <div className = 'blocaoPreto'
             style = {{display:'flex',
                       justifyContent:'center',
                       alignItems:'center',           
             }}>
          <div style = {{display: 'flex',
                         gap: '10px'}}>
            <button onClick={eventos}
                    className='bloquinhoAmarelo'>
            EVENTOS</button>
            <button onClick={participantes}
                    className='bloquinhoAmarelo'>
            PARTICIPANTES</button>
            <button onClick={certificados}
                    className='bloquinhoAmarelo'>
            CERTIFICADOS</button>
          </div>
        </div>
        <div style = {{margin: '0 auto',
                       flexDirection: 'column',
                       height: '75vh',
                       display: 'flex',
                       marginTop: '-90px',
                       justifyContent: 'center',
                       alignItems: 'center',}}>
          <h1 className= 'letreiro2'
              style = {{marginBottom:'-40px'}}
          >Gerenciamento</h1>
          <h1 className= 'letreiro2'
              style = {{marginBottom:'-40px'}}    
          >de</h1>
          <h1 className= 'letreiro2'>Certificados</h1>
        </div>
        
        <div className = 'blocaoVermelho'
             style = {{userSelect: 'none',}}>

          <img src={petlogo2}
               style = {{marginTop: '-90px'}}/>
               
        </div>

      </div>
    )
}