import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App.js';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App initMode={0}/>
);