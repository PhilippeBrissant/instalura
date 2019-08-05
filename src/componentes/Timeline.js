import React, { Component } from 'react'
import FotoItem from './Foto';
// import { TransitionGroup } from 'react-transition-group/'
// import { CSSTransition } from 'react-transition-group/'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class Timeline extends Component {

    constructor(){
        super();
        this.state = {fotos:[]};
    }

    componentWillMount(){
        this.props.store.subscribe((fotos) => {
            this.setState({fotos: fotos});
            // console.log("FOTOS timeline: ", this.state.fotos);
        });
    }

    componentDidMount(){
        this.carregaFotos();
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                        {
                            this.state.fotos.map(foto => 
                                <FotoItem key={foto.id} 
                                            foto={foto} 
                                            like={this.like.bind(this)} 
                                            comenta={this.comenta.bind(this)}/>
                            )
                        }
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    carregaFotos(){
        console.log('PROPS DE TIMELINE ', this.props);
        /*
        //fetch API = alternativa ao AJAX
        //retorna uma Promise
        const resultado = fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael');
        const html = resultado.then(resp => resp.text());
        html.then(pagina => console.log(pagina));
        

        var p = new Promise(resolve => resolve("curso react"));
        //p será uma promise com estado "resolved" e valor "curso react"
        //é possível passar uma função para 'reject' também
        */
       var url = '';
        if(localStorage.getItem('auth-token') != null)
            url = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        else
            url = `https://instalura-api.herokuapp.com/api/public/fotos/${this.props.login}`

        this.props.store.lista(url);
    }

    like(fotoId){
        this.props.store.like(fotoId);
    }

    comenta(fotoId, textComentario){
        this.props.store.comenta(fotoId, textComentario);
    }
}