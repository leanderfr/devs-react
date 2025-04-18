
import '../css/index.css';
import {  SharedContext } from './Main.jsx';
import {  useContext, useEffect, Fragment } from 'react';

// useState de 'Aminadav Glickshtein' permite 3o parametro para obter estado atual da variavel
// fazer isso com useState padrao do react é muito complicado
import useState from 'react-usestateref'

function Datatable( props ) {

  // expressions (frases) no idioma atual e item do menu lateral que foi clicado
  let { _expressions, _currentMenuItem }  = useContext(SharedContext);  

  
  // colunas que serao exibidias dependendo da tabela sendo vista (_currentMenuItem)
  let columns = []

  // manipulando tabela de desenvolvedores 
  //if (getCurrentTable.current === 'itemMenuDevelopers')
  if (_currentMenuItem === 'itemMenuDevelopers')  
    columns.push({ fieldname: "id", width: "20%", title: 'Id', id: 1 },
                { fieldname: "name", width: "calc(80% - 150px)", title: _expressions.column_name, id: 2} )

  // ultima coluna, acoes (editar, excluir, etc)
  columns.push( {name: 'actions', width: '150px', title: '', id: 3} )

  
  // registros da tabela atual (_currentMenuItem)
  let [records, setRecords, getRecords] = useState(null)

  // exibe animacao de carregamento pagina
  let [isLoading, setIsLoading] = useState(true)

  // exibe formulario de CRUD 
  let [crudFormOperation, setCrudFormOperation, getCrudFormOperation] = useState('')
  let [crudFormRecordId, setCrudFormRecordId, getCrudFormRecordId] = useState('')

  console.log('aqui='+getCrudFormOperation.current)

  // le registros da tabela atual
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

  // chama form para CRUD de alguma tabela 
  const Crud = ( operation, recordId ) => {
     setCrudFormOperation( operation )
     setCrudFormRecordId( recordId )
  }



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
        {columns.map(function (column)  {     
          return( <div key={column.id} style={{width: column.width }}>dd {column.title}  </div> );                 
        })}
    </div>          


    {/* looping para exibir registros da tabela atual */}
    <div className="DatatableRows">
      {/* percorre os registros */}
      { records && 
        records.map(function (record)  {     
              return(
                /* linha do registro  */
                <div className='DatatableRow' key={`tr${record.id}`}  > 
                {
                /* exbe cada coluna do registro atual  */
                columns.map(function (col, j, {length}) {
                    return( 
                      <Fragment key={`frag${record.id}${col.id}`} >
                          {/* exibe ultima, acoes (1a condicao abaixo) ou outras colunas (2a condicao abaixo) */}
                          {j===length-1 ? (
                                <div  className='actionColumn' style= {{ width: col.width}}  >
                                    <div className='actionIcon' onClick={ () => Crud('edit', record.id) } ><img alt='' src='images/edit.svg' /></div>
                                    <div className='actionIcon' onClick={ () => Crud('delete', record.id) }><img alt='' src='images/delete.svg' /></div>
                                    <div className='actionIcon' onClick={ () => Crud('status', record.id) }><img alt='' src='images/activate.svg' /></div>
                                </div>  ) : 

                              (<div style={{width: col.width, paddingLeft: '5px'}}> {record[col.fieldname]}  </div>) 

                          }
                      </Fragment>
                    )
                })}
                </div>
              )
        }) }
    </div>

    { getCrudFormOperation.current!='' && <div>dsjklsjdkldsjlklsjkd</div> }
    
    { isLoading &&  
        <div id='backdropWhite'>
          <div id='divLoading' >&nbsp;</div>
        </div>
    }


    

  </>

  )
}

export default Datatable;
