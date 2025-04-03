
import '../css/index.css';
import {  SharedContext } from './Main.jsx';
import {  useContext, useEffect } from 'react';

// useState de 'Aminadav Glickshtein' permite 3o parametro para obter estado atual da variavel
// fazer isso com useState padrao do react é muito complicado
import useState from 'react-usestateref'

function Datatable( props ) {

  // expressions só poderá ser usada quando Main.jsx enviar seu conteudo diferente de 'null'
  let { _expressions, _currentMenuItem }  = useContext(SharedContext);  

  // registros da tabela atual (_currentMenuItem)
  let [records, setRecords, getRecords] = useState(null)

  let columns = [ {name: 'actions', width: '100px'  }]

  if (_currentMenuItem === 'itemMenuDevelopers')
    columns.push({ name: "id", width: "calc(20% - 100px)" },
                { name: "name", width: "80%"} )

  let [isLoading, setIsLoading] = useState(true)

  const fetchRecords = async () =>  {

    let resource = ''
    switch (_currentMenuItem) {
      case 'itemMenuDevelopers':
        resource = 'developers'
        break;
      default:
    }

    fetch(`https://leanderdeveloper.store/devs-react/ajax.php?action=${resource}`)
    .then((response) => response.json())
    .then((data) => {
console.log('d='+data)
      setIsLoading(false)
      setRecords(data)
    })
    .catch((error) => console.log('erro='+error));

  }


  useEffect( () => {

      // carrega registros da tabela atual 
      // força 1/2 segundo de parada para que usuario perceba que esta recarregando
      if ( getRecords.current == null )    
        setTimeout(() => {
          fetchRecords()    
        }, 500);



  }, [records])


  return (
    <>
    <div className="CrudButtons">

        {/* botao= pesquisar nome */}
        <div className="CrudButton" style={{ _paddingRight:'20px' }} >
          <div style={{width: '200px', height: '100%' }}>
              { _expressions !=null && <input type='text' className='searchBox' placeholder={_expressions.searchname } /> }
          </div>
          <div className='magnifyingSearch'  >
              <img src='images/magnifying.svg' alt='' style={{ width:'20px' }}></img>
          </div>
        </div>

        {/* botao= novo registro */}
        <div className="CrudButton" style={{ paddingLeft:'20px', paddingRight:'20px', gap: '15px' }}    >
          <div><img src='images/add.svg' alt='' style={{ width:'22px' }}></img></div>
          <div><span>{ _expressions!=null && _expressions.addrecord }</span> </div>
        </div>
    </div>


    <div className="DatatableHeader">
        {columns.map(function (column, i)  {     
          return( <div key={i} style={{width: column.width }}> {column.name}  </div> );                 
        })}
    </div>          

    <div className="DatatableRows">
      { records && 
        records.map(function (record)  {     

            let row = ''  
            for (let x=0; x < columns.length; x++)  {
              let width = columns[x].width
              let fieldname = columns[x].name
              if (x===0)
                row += `<div style="width: ${width}"> acoes </div>` 
              else
                row += `<div style="width: ${width} "> ${record[fieldname]}  </div>` 
            }

            return(<div className='DatatableRow' key={record.id} dangerouslySetInnerHTML={{__html: row}}></div>)

        })
      }
    </div>          

    { isLoading && 
        <div id='backdropWhite'>
          <div id='divLoading' >&nbsp;</div>
        </div>
    }



  </>

  )
}

export default Datatable;
