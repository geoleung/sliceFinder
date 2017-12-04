import React from 'react';
import ReactDOM from 'react-dom';

class Credits extends React.Component {
    render() {
        return (
            <div className="credits clearfix">
                <i className="fa fa-info-circle expandCredits" aria-hidden="true"></i>
                <div className="allInfo clearfix">
                    <p>SliceFinder was created by </p>
                    <a href="http://amandasilberberg.com">Amanda Silberberg</a>
                    <p>, </p>
                    <a href="http://gaby.codes">Gaby Kupfer</a>
                    <p>, </p>
                    <a href="http://www.geoffreyleung.com">Geoffrey Leung</a>
                    <p> using the Yelp Fusion Api.</p>
                </div>
            </div>
        )
    }
}

export default Credits;