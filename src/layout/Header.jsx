import { useState, useContext } from 'react';
import '../css/index.css';
import {  SharedContext } from './Main.jsx';


// props= recebe funcoes que fazem a comunicacao entre Header.jsx e Main.jsx
// se Main.jsx ainda esta carregando dados, exibe Header.jsx com frases e configuracoes em branco/padrao
function Header( props ) {

  // expressions só poderá ser usada quando Main.jsx enviar seu conteudo diferente de 'null'
  let { _expressions, _isUSAChecked, _currentBackend }  = useContext(SharedContext);  

  let [isUSAChecked, setUSAChecked] = useState( typeof _isUSAChecked != 'undefined' ? _isUSAChecked : true  )
  let [expressions] = useState(_expressions)

  let [currentBackend, setCurrentBackend] = useState( typeof _currentBackend != 'undefined' ? _currentBackend : '' )

  // usuario alterou idioma, dispara evento 'onChangeLanguage' em Main.jsx
  const changeLanguage = ( isUSAChecked ) => {
    setUSAChecked(isUSAChecked)    // muda visualmente
    setTimeout(() => {
      props.onChangeLanguage( isUSAChecked );
    }, 100);

  };

  // usuario alterou idioma, dispara evento 'onChangeLanguage' em Main.jsx
  const changeBackend = ( backend ) => {
    setCurrentBackend(backend)   // muda visualmente
    setTimeout(() => {
      props.onChangeBackend( backend );  
    }, 100);
    
  };



  return (
    <>

      {/* seletor de front end */}
      <div className={'stackSelector'}>
        <div className={'stackType'} >
          { expressions!=null &&  expressions.frontend }          
        </div>
        <div className={'stackItemClicked'}> 
          <div style={{ display:'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <img src='images/react2.png' alt='' style={{ width: '30px'}} />
            <span>React JS</span>
          </div>
          <div className='gitIcon'>
            <img src='images/git.svg' alt='' style={{ width: '20px'}} />
          </div>  
        </div>

        <div className={'stackItem'}> 
          <div style={{ display:'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <img src='images/vue.png' alt='' style={{ width: '30px'}} />
            <span>Vue JS</span>
          </div>
          <div className='gitIcon'>
            <img src='images/git.svg' alt='' style={{ width: '20px'}} />
          </div>
        </div>

      </div>


      {/* seletor de back end */}
      <div className={'stackSelector'}>
        <div className={'stackType'} >
          { expressions!=null &&  expressions.backend }          
        </div>

        <div className={`${currentBackend === "laravel" ? "stackItemClicked" : "stackItem"}`} onClick={ () => changeBackend('laravel') }   > 
          <div style={{ display:'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <img src='images/laravel.png' alt='' style={{ width: '30px'}} />
            <span>Laravel</span>
          </div>
          <div className='gitIcon'>
            <img src='images/git.svg' alt='' style={{ width: '20px'}} />
          </div>  
        </div>

        <div className={`${currentBackend === "node" ? "stackItemClicked" : "stackItem"}`}    onClick={ () => changeBackend('node') }  > 
          <div style={{ display:'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <img src='images/node.png' alt='' style={{ width: '30px'}} />
            <span>Node.js</span>
          </div>
          <div className='gitIcon'>
            <img src='images/git.svg' alt='' style={{ width: '20px'}} />
          </div>
        </div>
      </div>


      {/* seletor do idioma */}
      <div className="countrySelect">    

        <div className={`${! isUSAChecked ? "flagClicked" : "flagUnclicked"}`}  id='flagBRAZIL' onClick={ () => changeLanguage(false) }  >         
          <img src='images/brazil_flag.svg' alt='' />
        </div>

        <label htmlFor="chkLanguageSelector" className="switch_language"  >
          <input id="chkLanguageSelector" type="checkbox"  checked={isUSAChecked}  onChange={ () => {changeLanguage(isUSAChecked => ! isUSAChecked)  } } />
          <span className="slider_language round"></span>
        </label>

        <div className={`${isUSAChecked ? "flagClicked" : "flagUnclicked"}`}  id='flagBRAZIL' onClick={ () => changeLanguage(true) }  >         
          <img src='images/usa_flag.svg' alt='' />
        </div>
      </div>

    </>
  );
}

export default Header;
