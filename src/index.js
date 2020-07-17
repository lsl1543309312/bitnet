import React from 'react';
import  ReactDOM  from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';

import Login from './Compontents/Login';
import Doctor from './Compontents/Doctor';
// import App from './App';


ReactDOM.render(
   <Router>
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <Route path='/Doctor' component={Doctor}></Route> 
    </Switch>
  </Router>
  // <App />
  , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
