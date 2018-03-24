"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
require("./index.scss");
//import App from './App';
require("bootstrap/dist/css/bootstrap.min.css");
const registerServiceWorker_1 = require("./registerServiceWorker");
const BlogApp_1 = require("./BlogApp");
const react_redux_1 = require("react-redux");
const Store_1 = require("./Store");
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: Store_1.default },
    React.createElement(BlogApp_1.default, null)), document.getElementById('root'));
registerServiceWorker_1.default();
//# sourceMappingURL=index.js.map