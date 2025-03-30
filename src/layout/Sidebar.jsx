
import '../css/index.css';
import ItemMenu from './ItemMenu.jsx';
import { useContext, useState } from 'react';
import {  ExpressionsContext } from './Main.jsx';

//let developers = 'Desenvolvedores'
//let languages = 'Linguagens'

function Sidebar() {

  let expressions  = useContext(ExpressionsContext);  

  return (

    <>

      <div className='logoReact'>
        <img src='images/react.png' alt='' style={{ width: '70px'}} />
        <span >React JS - Demo Application</span>
      </div>

      { expressions!=null && <ItemMenu text={expressions.developers} /> } 
      { expressions!=null && <ItemMenu text={expressions.languages} /> } 
    </>        
  );
}

export default Sidebar;
