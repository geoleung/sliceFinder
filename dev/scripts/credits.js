import React from 'react';
import ReactDOM from 'react-dom';

class Credits extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }
    toggleVisibility() {
        if (this.state.visible === false) {
            this.setState({ visible: true })
        } else if (this.state.visible === true) {
            this.setState({ visible: false })
        }
    }
    render() {
        return (
            <div className="credits clearfix">
                <i className="fa fa-info-circle expandCredits" aria-hidden="true" onClick={this.toggleVisibility}></i>
                {this.state.visible === true ?
                    <div className="allInfo clearfix">
                        <p>SliceFinder was created by </p>
                        <a href="http://amandasilberberg.com" target="_blank">Amanda Silberberg</a>
                        <p>, </p>
                        <a href="http://gaby.codes" target="_blank">Gaby Küpfer</a>
                        <p>, </p>
                        <a href="http://www.geoffreyleung.com" target="_blank">Geoffrey Leung</a>
                        <p> using the Yelp Fusion API.</p>
                    </div>
                    :
                    <div className="allInfo hidden clearfix">
                        <p>SliceFinder was created by </p>
                        <a href="http://amandasilberberg.com" target="_blank">Amanda Silberberg</a>
                        <p>, </p>
                        <a href="http://gaby.codes" target="_blank">Gaby Küpfer</a>
                        <p>, </p>
                        <a href="http://www.geoffreyleung.com" target="_blank">Geoffrey Leung</a>
                        <p> using the Yelp Fusion API.</p>
                    </div>
            
            
            
                }
                
            </div>
        )
    }
}

export default Credits;