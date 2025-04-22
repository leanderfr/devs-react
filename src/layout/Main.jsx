
import { useEffect, createContext  } from 'react';


// useState de 'Aminadav Glickshtein' permite 3o parametro para obter estado atual da variavel
// fazer isso com useState padrao do react é muito complicado
import useState from 'react-usestateref'
import '../css/index.css';

import Header from './Header';
import Datatable from './Datatable';
import Sidebar from './Sidebar.jsx';

import $ from 'jquery'

import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

import 'spin.js/spin.css';
import {Spinner} from 'spin.js';

export const SharedContext = createContext();

export const backendUrl = 'http://ec2-54-94-203-105.sa-east-1.compute.amazonaws.com:8071'

function Main() {

  // controla se o idioma inglês esta selecionado no momento (via checkbox)
  let [isUSAChecked, setUSAChecked, getUSAChecked] = useState(true)

  // controla backend atual
  let [currentBackend, setCurrentBackend] = useState('laravel')

  // controla item do menu lateral (sidebar) atualmente clicado
  let [currentMenuItem, setCurrentMenuItem] = useState('itemMenuDevelopers')


  let [isLoading, setIsLoading] = useState(true)

  // expressoes/frases usadas dependendo do idioma selecionado
  let [expressions, setExpressions, getExpressions] = useState(null)
//  const [error, setError] = useState(null)

  // usuario mudou idioma atual em Header.jsx, recarrega 
  const changeLanguageAndReload = ( isUSAChecked ) => {
    setIsLoading(true)
    setUSAChecked(isUSAChecked)   // define novo idioma que foi recebido de 'Header.jsx'
    setExpressions(null)   // dispara useEffect 
  } 

  // usuario mudou backend em header.jsx, recarrega 
  const changeBackendAndReload = ( backend ) => {
    setIsLoading(true)
    setCurrentBackend(backend)   
    setExpressions(null)   // dispara useEffect 
  } 



  const fetchExpressions = async () =>  {

    let _isUSAChecked = getUSAChecked.current
    let language = _isUSAChecked ? 'english' : 'portuguese';

    fetch(`${backendUrl}/expressions/${language}`)
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false)
      setExpressions(data);
    })
    .catch((error) => console.log('erro='+error));

  }


  useEffect( () => {

      // react exibe/remove animacao ajax, necessario refazer propriedades da animacao sempre que for reexibida (useEffect)
      var opts = {
        lines: 12 // The number of lines to draw
      , length: 40 // The length of each line
      , width: 18 // The line thickness
      , radius: 42 // The radius of the inner circle
      , scale: 0.3 // Scales overall size of the spinner
      , corners: 3 // Corner roundness (0..1)
      , color: 'gray' // #rgb or #rrggbb or array of colors
      , opacity: 0.3 // Opacity of the lines
      , rotate: 0 // The rotation offset
      , direction: 1 // 1: clockwise, -1: counterclockwise
      , speed: 1 // Rounds per second
      , trail: 60 // Afterglow percentage
      , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
      , zIndex: 2e9 // The z-index (defaults to 2000000000)
      , className: 'spinner' // The CSS class to assign to the spinner
      , top: '50%' // Top position relative to parent
      , left: '50%' // Left position relative to parent
      , shadow: true // Whether to render a shadow
      , hwaccel: true // Whether to use hardware acceleration
      , position: 'absolute' // Element positioning
      ,animation: 'spinner-line-fade-quick'
      }

      // para exibir/ocultar esta div, usar as funcoes: showLoadingGif()/hideLoadingGif()
      var divLoading = document.getElementById('divLoading');
      new Spinner(opts).spin(divLoading);
  
      // carrega expressoes do idioma atual
      // força 1/2 segundo de parada para que usuario perceba que esta recarregando
      // necessario testar de 'expressions' nulo, se nao react executa useEffect sem parar
      if ( getExpressions.current == null )    
        setTimeout(() => {
          fetchExpressions()    
        }, 500);



  }, [expressions])


  return (

    <div className="Content">



      {/* context => compartilha idioma, expressoes e backend  atual entre os componentes */}
      <SharedContext.Provider 
        value={{ 
            _expressions: expressions, 
            _isUSAChecked: isUSAChecked, 
            _currentBackend: currentBackend, 
            _currentMenuItem: currentMenuItem  }}  >

          {/* barra lateral esquerda */}
          <div className='Sidebar'>
                <Sidebar  />
          </div>

          {/* header e datatable */}
          <div className="Main">

              <div className='Header'>
                {/* se esta carregando expressoes ainda, carrega Header sem dados, só parte visual */}
                { isLoading && 
                  <Header  /> }

                {/* se ja carregou expressoes, carrega Header com as frases do idiomas atual */}
                { expressions && 
                  <Header                 
                    onChangeLanguage={changeLanguageAndReload}                 
                    onChangeBackend={changeBackendAndReload} 
                  /> }

              </div>

              <div className='Datatable'>
                { expressions && <Datatable /> }
              </div>

          </div>

      </SharedContext.Provider>



      { isLoading && 
          <div id='backdropWhite'>
            <div id='divLoading' >&nbsp;</div>
          </div>
      }


    </div>    
  );
}

export default Main;
