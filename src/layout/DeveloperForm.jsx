
import '../css/index.css';
import {  useEffect } from 'react';
import {  backendUrl } from './Main.jsx';

// useState de 'Aminadav Glickshtein' permite 3o parametro para obter estado atual da variavel
// fazer isso com useState padrao do react é muito complicado
import useState from 'react-usestateref'


function DeveloperForm( props )    {

    
    // expressions (frases) no idioma atual e item do menu lateral que foi clicado
    let expressions = props.expressions

    // contem o html o form atual
    let [developer, setDeveloper, getDeveloper] = useState(null)

    // obtem detalhes sobre qual registro editar
    const {operation, recordId, table} = props;


    // carrega html do formulario
    const fetchDeveloper = async () =>  {
        // monta formulario
        fetch(`${backendUrl}/developers/${recordId}`, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setDeveloper(data)
//          props.setIsLoading(false)
        })
        .catch((error) => console.log('erro='+error));
    }

    useEffect( () => {
      // carrega dados do developer atual
      // força 1/2 segundo de parada para que usuario perceba que esta recarregando
      if ( getDeveloper.current == null )    
        props.setIsLoading(true)

        setTimeout(() => {
          fetchDeveloper()    
        }, 500);
    } )


    return(

        <>

            { developer && 

                  <div className='flex flex-col px-3'>
                    <label htmlFor='txtName'>s{ expressions.name} </label>
                    <input name='txtName' defaultValue={ developer.name }  style={{ width: '100%'}} />
                  </div>


            }

      </>
    )  
}

export default DeveloperForm;
