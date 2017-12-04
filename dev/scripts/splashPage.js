import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserInputPage from './userInputPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


class SplashPage extends React.Component {
    constructor() {
        super();
        this.state = {
            logoHover: false
        }
        this.logoHover = this.logoHover.bind(this);
        this.logoStatic = this.logoStatic.bind(this);
    }
    logoHover() {
        this.setState({
            logoHover: true
        })
    }
    logoStatic() {
        this.setState({
            logoHover: false
        })
    }

    render() {
        return(
            <section className="splashPage">
                {this.state.logoHover === true ? 
                    <img src="public/assets/logo-coloured.png" alt="Slice Finder company logo." className="hover"/>
                    :
                    <img src="public/assets/logo-coloured.png" alt="Slice Finder company logo."/>
                }
                <p className="logo">slice finder</p>
                <button className="enterSite" onMouseEnter={this.logoHover} onMouseLeave={this.logoStatic}>
                    <Link to="/app">Enter Site</Link>
                </button>
            </section>
        )
    }
}

export default SplashPage;