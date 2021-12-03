import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LayoutComp from './component/Layout'

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <LayoutComp/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


