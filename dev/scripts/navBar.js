import React from 'react';

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <a href="#">
                    <img src="public/assets/logo-white.png" alt="Slice Finder company logo."/>
                    <p>slice finder</p>
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
        )
    }
}

export default NavBar;