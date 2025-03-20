
import 'css/index.css';
import { useState } from 'react';


function Header() {
  const [isUSAChecked, setUSAChecked] = useState(true)

  return (
    <div className="Header">

      <div>Current Back end</div>

      <div className="countrySelect">    

        <div className={`${! isUSAChecked ? "flagClicked" : "flagUnclicked"}`}  id='flagBRAZIL' onClick={ () => setUSAChecked(false) }  >         
          <img src='images/brazil_flag.svg' alt='' />
        </div>

        <label htmlFor="chkLanguageSelector" className="switch_language"  >
          <input id="chkLanguageSelector" type="checkbox"  checked={isUSAChecked}  onChange={ () => {setUSAChecked(isUSAChecked => ! isUSAChecked)  } } />
          <span className="slider_language round"></span>
        </label>

        <div className={`${isUSAChecked ? "flagClicked" : "flagUnclicked"}`}  id='flagBRAZIL' onClick={ () => setUSAChecked(true) }  >         
          <img src='images/usa_flag.svg' alt='' />
        </div>
      </div>

      <div>leanderprogrammer@gmail.com</div>

    </div>
  );
}

export default Header;
