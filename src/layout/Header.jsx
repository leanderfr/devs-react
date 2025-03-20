
import '../css/index.css';
import { useState } from 'react';


function Header() {
  const [isUSAChecked, setUSAChecked] = useState(true)

  return (
    <div className="Header">

      <div className={'stackSelector'}>
        <div style={{ marginBottom:'5px' }}>
          CURRENT FRONT END
        </div>
        <div className={'stackItemClicked'}> 
          <div style={{ display:'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <img src='images/react2.png' alt='' style={{ width: '30px'}} />
            <span>React JS</span>
          </div>
          <div className='gitIcon'>
            <img src='images/git.svg' alt='' style={{ width: '20px'}} />
          </div>  
        </div>

        <div className={'stackItem'}> 
          <div style={{ display:'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <img src='images/vue.png' alt='' style={{ width: '30px'}} />
            <span>Vue JS</span>
          </div>
          <div className='gitIcon'>
            <img src='images/git.svg' alt='' style={{ width: '20px'}} />
          </div>
        </div>

      </div>


      <div className={'stackSelector'}>
        CURRENT BACK END
      </div>


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

    </div>
  );
}

export default Header;
