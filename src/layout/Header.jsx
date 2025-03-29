import { useState, useEffect } from 'react';
import '../css/index.css';



function Header( props ) {

  const [isUSAChecked, setUSAChecked] = useState( props.isUSAChecked )

  const changeLanguage = ( isUSAChecked ) => {
    setUSAChecked( isUSAChecked )
    props.onChangeLanguage( isUSAChecked );
  };




  return (
    <>

      <div className={'stackSelector'}>
        <div style={{ marginBottom:'5px' }}>
          expressions.frontend
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

        <div className={`${! isUSAChecked ? "flagClicked" : "flagUnclicked"}`}  id='flagBRAZIL' onClick={ () => changeLanguage(false) }  >         
          <img src='images/brazil_flag.svg' alt='' />
        </div>

        <label htmlFor="chkLanguageSelector" className="switch_language"  >
          <input id="chkLanguageSelector" type="checkbox"  checked={isUSAChecked}  onChange={ () => {changeLanguage(isUSAChecked => ! isUSAChecked)  } } />
          <span className="slider_language round"></span>
        </label>

        <div className={`${isUSAChecked ? "flagClicked" : "flagUnclicked"}`}  id='flagBRAZIL' onClick={ () => changeLanguage(true) }  >         
          <img src='images/usa_flag.svg' alt='' />
        </div>
      </div>

    </>
  );
}

export default Header;
