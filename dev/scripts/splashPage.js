import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserInputPage from './userInputPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class SplashPage extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
            <section className="splashPage">
                <img src="public/assets/logo-coloured.png" alt="Slice Finder company logo."/>
                <p className="logo">slice finder</p>
                <button className="enterSite">
                    <Link to="/app">Enter Site</Link>
                </button>
            </section>
        )
    }
}

export default SplashPage;