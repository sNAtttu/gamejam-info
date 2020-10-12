
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/store"
import { Provider } from 'react-redux'
import Moment from 'react-moment';


Moment.startPooledTimer(1000);
// Set the output format for every react-moment instance.

const AppWrapper = () => {


  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <AppWrapper></AppWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
