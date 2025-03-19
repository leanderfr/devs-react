
import './index.css';
import ItemMenu from './ItemMenu.jsx';

let developers = 'Desenvolvedores'
let languages = 'Linguagens'

function Sidebar() {
  return (
    <div className="Sidebar">

      <img src='images/react.png' alt='' />

      <ItemMenu text={ developers } />
      <ItemMenu text={ languages } />
        
    </div>
  );
}

export default Sidebar;
