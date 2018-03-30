import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
//import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import BlogApp from "./BlogApp";
import { Provider } from 'react-redux';
import store from './Store';
ReactDOM.render(React.createElement(Provider, { store: store },
    React.createElement(BlogApp, null)), document.getElementById('root'));
registerServiceWorker();
//# sourceMappingURL=index.js.map