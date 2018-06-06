import React from 'react';
import ReactDOM from 'react-dom';
import './css/normalize.css'
import './css/index.css';
import App from './App';
import  register  from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
register();
