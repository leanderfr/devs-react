
import { useState, useEffect } from 'react';
import '../css/index.css';

import Header from './Header';
import Datatable from './Datatable';
import Sidebar from './Sidebar.jsx';

import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';
import {Spinner} from 'spin.js';


function Main() {

  // propriedades da animacao que sera exibida dentro de 'divLoading', sempre que houver uma requisicao ao server-side
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
  }

  // para exibir/ocultar esta div, usar as funcoes: showLoadingGif()/hideLoadingGif()
  var target = document.getElementById('divLoading');
  var spinner = new Spinner(opts).spin(target);

  const [isUSAChecked, changeLanguage] = useState(true)
  const [isLoading, setIsLoading] = useState(true)



//  const [expressions, setExpressions] = useState(null)
  //const [isLoading, setIsLoading] = useState(true)
//  const [error, setError] = useState(null)

  const fetchExpressions = async ()  => {
    setIsLoading(true)
    let language = isUSAChecked ? 'english' : 'portuguese';
    fetch(`https://leanderdeveloper.store/devs-react/ajax.php?action=expressions&language=${language}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('chegou='+data)
    setIsLoading(false)
    })
    .catch((error) => console.log('erro='+error));


//isLoading

  }


  useEffect( () => {
console.log('isUSAChecked='+isUSAChecked)
    fetchExpressions()
  })



  return (

    <div className="Content">

      { isLoading && <div className='teste'>carregando</div> }
      { ! isLoading && 
          <>
          <div className='Sidebar'>
            <Sidebar  />
          </div>

          <div className="Main">

              <div className='Header'>
                <Header onChangeLanguage={changeLanguage} isUSAChecked={isUSAChecked}  />
              </div>

              <div className='Datatable'>
                <Datatable />
              </div>

          </div>
          </>
      }

    </div>    
  );
}

export default Main;
