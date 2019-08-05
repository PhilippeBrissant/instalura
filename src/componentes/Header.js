import React, { Component } from 'react'
import Pubsub from 'pubsub-js'

export default class Header extends Component {
    pesquisa(event){
        event.preventDefault();

        const url = `https://instalura-api.herokuapp.com/api/public/fotos/${this.loginPesquisa.value}`;

        fetch(url)
        .then(response => {
            if (response.ok)
                return response.json();
            else 
                throw new Error("Erro na pesquisa");
        })
        .then(fotos => {
            // console.log("FOTOS PESQUISA: ", fotos);
            Pubsub.publish('timeline', {fotos});
        });
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">Instalura</h1>

                <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisa = input}/>
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>

                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <a href="#">
                                ♡
                                {/* <!--                 ♥--> */}
                                {/* <!--Quem deu like nas minhas fotos?--> */}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}