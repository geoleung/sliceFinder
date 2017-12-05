import React from 'react';
import ReactDOM from 'react-dom';
import SplashPage from './splashPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="clearfix">
                <div className="wrapper clearfix">
                    <Link to="/" className="backToSplash">
                        <div className="imageHolder">
                            <img src="public/assets/logo-coloured.png" alt="Slice Finder company logo." />
                        </div>
                        <p className="logo">slice finder</p>
                    </Link>
                    <div className="social">
                        <a href="https://github.com/GottaCacheEmAll/sliceFinder">
                            <i className="fa fa-github" aria-hidden="true" aria-label="View on GitHub"></i>
                        </a>
                        <a href="https://twitter.com/intent/tweet?text=Looking for a great slice of pizza in your area? Check out Slice Finder at http://bit.ly/2km4PYf !&hashtags=slicefinder" className="tweet" target="_blank">
                            <i className="fa fa-twitter" aria-hidden="true" aria-label="Share on twitter."></i>
                        </a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;