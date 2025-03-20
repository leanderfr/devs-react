
import 'css/index.css';
import ItemMenu from 'layout/ItemMenu.jsx';

let developers = 'Desenvolvedores'
let languages = 'Linguagens'


function Sidebar() {

  return (
    <div className="Sidebar">

      <div className='logoReact'>
        <img src='images/react.png' alt='' style={{ width: '50px'}} />
        <span >React JS - Demo Application</span>
      </div>

      <ItemMenu text={ developers } />
      <ItemMenu text={ languages } />
        
    </div>
  );
}

export default Sidebar;
