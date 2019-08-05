import React, {Component} from 'react'
import qs from 'query-string';

export default class Login extends Component{
    constructor(props){
        super(props);

        //import { URLSearchParams } from 'url';
        // const params = new URLSearchParams(this.props.location.search);
        // console.log('params: ' + params);
        // this.state = { msg:params.get('msg') };

        const msg = qs.parse(this.props.location.search).msg;
        this.state = { msg: msg == null ? '' : msg};
    }

    envia(event){
        event.preventDefault();

        const requestInfo = {
            method: 'post',
            body: JSON.stringify({
                login: this.login.value,
                senha: this.senha.value
            }),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };

        fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
        .then(resp => {
            if(resp.ok){
                this.setState({msg:''});
                return resp.text();
            }
            else            
                throw new Error('Deu ruim no login');
        })
        .then( token => {
            //API localStorage do navegador
            localStorage.setItem('auth-token', token);
            this.props.history.push('timeline');
        })
        .catch( erro => this.setState({msg:'Deu ruim no login!! :('}) );
    }

    render(){
        return(
            <div className="login-box">
               <h1 className="header-logo">Instalura</h1>
               <span>{this.state.msg}</span>
               <form onSubmit={this.envia.bind(this)}> 
                    <input type="text" ref={input => this.login = input}/>
                    <input type="password" ref={ input => this.senha = input }/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}