import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Foto extends Component {
    render() {
        return (
            <div className="foto">
                <Header foto={this.props.foto}/>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
                <FotoInfo foto={this.props.foto}/>
                <FotoAtualizacao foto={this.props.foto} like={this.props.like} comenta={this.props.comenta}/>
                {/* <FotoAtualizacoes {...this.props}/> */}
            </div>
        );
    }
}

class Header extends Component{
    render(){
        return(
            <header className="foto-header">
                    <figure className="foto-usuario">
                        <img src={this.props.foto.urlPerfil} alt="foto do usuario" />
                        <figcaption className="foto-usuario">
                            <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                                {this.props.foto.loginUsuario}
                            </Link>
                        </figcaption>
                    </figure>
                    <time className="foto-data">{this.props.foto.horario}</time>
                </header>
        );
    }    
}

class FotoInfo extends Component{

    // constructor(props){
    //     super(props);
    //     this.state = {likers: this.props.foto.likers, comentarios: this.props.foto.comentarios}
    // }

    // componentWillMount(){
    //     Pubsub.subscribe('atualiza-liker', (topico, infoLiker) => {
    //         // console.log(topico);
    //         // console.log('infoliker: ', infoLiker);
            
    //         if(this.props.foto.id === infoLiker.fotoId){
    //             const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
    //             // console.log('possivelLiker: ', possivelLiker);
    //             //se não achar o novo liker na lista, adiciona-o
    //             if(possivelLiker === undefined){
    //                 const novosLikers = this.state.likers.concat(infoLiker.liker);
    //                 this.setState({likers: novosLikers});
    //             }
    //             //caso contrário, o liker está na lista, ou seja, ele esta dando dislike e tem que sair da mesma
    //             else{
    //                 const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
    //                 this.setState({likers: novosLikers});
    //             }
    //         }           
    //     });

    //     Pubsub.subscribe('novos-comentarios', (topico, infoComentario) => {
    //         if(this.props.foto.id === infoComentario.fotoId){
    //             const novosComents = this.state.comentarios.concat(infoComentario.comentario);
    //             this.setState({comentarios: novosComents});
    //         }
    //     });
    // }
    
    render(){
        return(
            <div className="foto-info">
                <div className="foto-info-likes">
                    {
                        this.props.foto.likers.map(
                            liker => {
                                return (
                                    <Link key={liker.login} to={`/timeline/${liker.login}`}>
                                        {liker.login}, 
                                    </Link>
                                )
                            }
                        )
                    }
                    curtiram
                </div>

                <p className="foto-info-legenda">
                    <Link to={`/timeline/${this.props.foto.loginUsuario}`} className="foto-info-autor">
                        {this.props.foto.loginUsuario} 
                    </Link>
                     {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map(
                            comentarioDaFoto => {
                                return (
                                    <li key={comentarioDaFoto.id} className="comentario">
                                        <Link to={`/timeline/${comentarioDaFoto.login}`} className="foto-info-autor">
                                            {comentarioDaFoto.login } 
                                        </Link>
                                        {comentarioDaFoto.texto}
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
            </div>
        );
    }
}

class FotoAtualizacao extends Component{

    // constructor(props){
    //     super(props);
    //     this.state = {liked: this.props.foto.likeada};
    // }

    like(event){
        event.preventDefault();
        this.props.like(this.props.foto.id);
    }

    comenta(event){
        event.preventDefault();
        this.props.comenta(this.props.foto.id, this.comentario.value);
    }

    // like(event){
    //     event.preventDefault();

    //     const url = `https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

    //     fetch(url, {method: 'POST'})
    //     .then(response => {
    //         if(response.ok)
    //             return response.json();
    //         else{
    //             // console.log('response: ', response);
    //             throw new Error("Não foi possível realizar o like da foto");
    //         }
    //     })
    //     .then(liker =>{
    //         // console.log('liker: ', liker);
    //         this.setState({ liked : !this.state.liked });
    //         Pubsub.publish('atualiza-liker', {fotoId:this.props.foto.id, liker: liker});
    //         // Pubsub.publish('atualiza-liker', {fotoId:this.props.id, liker}); shortest hand
    //     });
    // }

    // comenta(event){
    //     event.preventDefault();

    //     const url = `https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    //     const resquestInfo = {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             texto: this.comentario.value
    //         }),
    //         headers: new Headers({
    //             'Content-type':'application/json'
    //         })
    //     };
        
    //     fetch(url, resquestInfo)
    //     .then(response =>{
    //         if(response.ok)
    //             return response.json();
    //         else
    //             return new Error("Erro ao comentar");
    //     })
    //     .then(coment =>{
    //         Pubsub.publish('novos-comentarios', {fotoId: this.props.foto.id, comentario: coment});
    //     });

    //     this.comentario = '';
    // }

    render(){
        return(
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} className={this.props.foto.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}> 
                    Likar
                </a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        );
    }
}