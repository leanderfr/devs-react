import React from 'react';
import ReactDOM from 'react-dom/client';
import 'css/index.css';
import Main from 'layout/Main.jsx';
import Sidebar from 'layout/Sidebar.jsx';


//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

        <Sidebar  />
        <Main />

  </React.StrictMode>
);

//reportWebVitals();
