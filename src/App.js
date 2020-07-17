import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Login from './Compontents/Login/index';
import Doctor from './Compontents/Doctor/index';
class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Login}></Route>
                    <Route path='/Doctor' component={Doctor}></Route>
                        
                     
                </Switch>
            </Router>
        );
    }
}

export default App;