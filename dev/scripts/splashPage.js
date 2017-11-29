import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class SplashPage extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
            <section className="splashPage">
                <img src="public/assets/logo-white.png" alt="Slice Finder company logo."/>
                <h1>slice finder</h1>
                <button className="enterSite">
                    <Link to="/about">Enter Site</Link>
                </button>
            </section>
        )
    }
}

export default SplashPage;