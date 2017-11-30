import React from 'react';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="clearfix">
                <div className="wrapper">
                    <a href="#" className="backToSplash clearfix">
                        <div className="imageHolder">
                            <img src="public/assets/logo-coloured.png" alt="Slice Finder company logo."/>
                        </div>
                        <p className="logo">slice finder</p>
                    </a>
                    <div className="social">
                        <a href="#">
                            <i className="fa fa-github" aria-hidden="true" aria-label="View on GitHub"></i>
                        </a>
                        <a href="#">
                            <i className="fa fa-twitter" aria-hidden="true" aria-label="Share on twitter."></i>
                        </a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;