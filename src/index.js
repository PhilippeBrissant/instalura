import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import {BrowserRouter, Route, Redirect, matchPath} from 'react-router-dom';
import Login from './componentes/Login'
import Logout from './componentes/Logout'
import App from './App';
import {createBrowserHistory} from 'history';

function verificaAutenticacao(nextState, replace){
    console.log('nextState index.js: ', nextState);
    const history = createBrowserHistory();
    const match = matchPath(history.location.pathname, {path: '/timeline/:login', exact: true});
    const rotaPrivadaDaTimeline = match === null;

    if(rotaPrivadaDaTimeline && localStorage.getItem('auth-token')  === null) 
        return false
    return true
}

ReactDOM.render(
    (<BrowserRouter>
        <Route exact path="/" component={Login}/>
        <Route exact path="/logout" component={Logout}/>
        <Route exact path="/timeline/:login" component={App}/>
        <Route exact path="/timeline" render={
            () => verificaAutenticacao() ? 
                <App /> : <Redirect to="/?msg=Você precisa estar logado!"/>
        }/>
    </BrowserRouter>), 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
