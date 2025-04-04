
import '../css/index.css';
import {  SharedContext } from './Main.jsx';
import {  useContext, useEffect } from 'react';

// useState de 'Aminadav Glickshtein' permite 3o parametro para obter estado atual da variavel
// fazer isso com useState padrao do react é muito complicado
import useState from 'react-usestateref'

function Datatable( props ) {

  // expressions (frases) no idioma atual
  let { _expressions, _currentMenuItem }  = useContext(SharedContext);  
  
  // colunas que serao exibidias dependendo da tabela sendo vista (_currentMenuItem)
  let columns = []

  if (_currentMenuItem === 'itemMenuDevelopers')
    columns.push({ fieldname: "id", width: "20%", title: 'Id' },
                { fieldname: "name", width: "calc(80% - 150px)", title: _expressions.column_name} )

  // ultima coluna, acoes (editar, excluir, etc)
  columns.push( {name: 'actions', width: '150px', title: ''} )

  
  // registros da tabela atual (_currentMenuItem)
  let [records, setRecords, getRecords] = useState(null)

  let [isLoading, setIsLoading] = useState(true)

  const fetchRecords = async () =>  {

    let resourceFetch = ''
    switch (_currentMenuItem) {
      case 'itemMenuDevelopers':
        resourceFetch = 'developers'
        break;
      default:
    }

    fetch(`https://leanderdeveloper.store/devs-react/ajax.php?action=${resourceFetch}`)
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


    {/* looping para exibir cada coluna baseado na tabela atual */}
    <div className="DatatableHeader">
        {columns.map(function (column, i)  {     
          return( <div key={i} style={{width: column.width }}> {column.title}  </div> );                 
        })}
    </div>          

    {/* looping para exibir registros da tabela atual */}
    <div className="DatatableRows">
      { records && 
        records.map(function (record)  {     

            let row = ''  
            for (let x=0; x < columns.length; x++)  {
              let width = columns[x].width
              let fieldname = columns[x].fieldname

              // monta a linha do registros (row)

              // ultima coluna, acoes (editar, excluir, etc)          
              if (x===columns.length-1)
                row += `<div class='actionColumn' style="width: ${width}">`+
                       `  <div class='actionIcon'><img src='images/edit.svg' /></div>` +
                       `  <div class='actionIcon'><img src='images/delete.svg' /></div>` +
                       `  <div class='actionIcon'><img src='images/activate.svg' /></div>` +
                       ' </div>'

              // outra coluna qualquer (nome, id, etc)
              else
                row += `<div style="width: ${width}; padding-left: 5px "> ${record[fieldname]} </div>` 
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
