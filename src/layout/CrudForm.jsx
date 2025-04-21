
import '../css/index.css';
import {  useContext, useEffect, Fragment } from 'react';

// useState de 'Aminadav Glickshtein' permite 3o parametro para obter estado atual da variavel
// fazer isso com useState padrao do react é muito complicado
import useState from 'react-usestateref'


function CrudForm( props ) {

// contem o html o form atual
let [htmlForm, setHtmlForm, getHtmlForm] = useState(null)

// obtem detalhes sobre qual registro editar
const {operation, recordId, table} = props;

// exibe animacao de carregamento form 
let [isLoading, setIsLoading] = useState(true)


// carrega html do formulario
const fetchHtmlForm = async () =>  {

    fetch(`https://leanderdeveloper.store/devs-react/ajax.php?action=nada`)
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false)
      setHtmlForm(data)
    })
    .catch((error) => console.log('erro='+error));
  }


  useEffect( () => {
      // carrega html do form atual
      // força 1/2 segundo de parada para que usuario perceba que esta recarregando
      if ( getHtmlForm.current == null )    
        setTimeout(() => {
          fetchHtmlForm()    
        }, 500);

  })


return(
<div className='crudForm'>LJKALJKLKJKLSDJLKDS</div>
)  

}

export default CrudForm;
