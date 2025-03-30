
import '../css/index.css';
import {  SharedContext } from './Main.jsx';
import {  useContext } from 'react';

function Datatable() {

  // expressions só poderá ser usada quando Main.jsx enviar seu conteudo diferente de 'null'
  let { _expressions }  = useContext(SharedContext);  


  return (
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
  );
}

export default Datatable;
