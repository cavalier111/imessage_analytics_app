import App from "./components/App";
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store/store';
require("babel-core/register");
require("babel-polyfill");
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';


const rootElement = document.getElementById('app')
ReactDOM.render(
	<BrowserRouter>
	  <Provider store={store}>
	    <App />
	  </Provider>
	</BrowserRouter>,
  rootElement
)
registerServiceWorker();