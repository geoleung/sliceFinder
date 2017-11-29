
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';

class App extends React.Component {
    constructor() {
        super(),
        this.state = {
            accessToken: '',
            userLocation: '',
            restaurantIDs: [],
        }
    }

    componentDidMount() {
        axios.get('https://yelp-oauth.herokuapp.com/token', {
            params: {
                "token_type": "Bearer"
            }
        }).then((response) => {
            this.setState({
                accessToken: result.data.response.access_token
            });
        })
    }

    restaurantSearch(e) {
        e.preventDefault();

        axios({
            method: 'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: 'https://api.yelp.com/v3/businesses/search',
                params: {
                    categories: 'pizza',
                    location: this.state.userLocation,
                    limit: 50,
                },
                proxyHeaders: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                },
                xmlToJSON: false
            }
        }).then((res) => {
            const restaurantArray = result.data.businesses

            const restaurantIDArray = restaurantArray.map((restaurant) => {
                return restaurant.id;
                //INSTEAD OF JUST PULLING OUT THE RESTAURANT ID FOR EACH RESTAURANT, PULL OUT ALL THE INFO WE'LL NEED -- ID, NAME, IMAGE, ANYTHING ELSE WE WANT TO DISPLAY, IN AN OBJECT
            });

            this.setState({
                restaurantIDs: restaurantIDArray,
            });
        });
    }
    

    render() {
        <div>
            <input type="text"/> //user location input
            <button>submit</button> //on submit of this, call restaurantSearch
            <ReviewSearch restIDArray={this.state.restaurantIDs}/>
        </div>
    }
}

class ReviewSearch extends React.Component {
    constructor() {
        super();
        
    }

    componentDidMount() {
        const reviewPromises = this.props.restIDArray.map((restaurantID) => {
            return axios({
                method: 'GET',
                url: 'http://proxy.hackeryou.com',
                dataResponse: 'json',
                paramsSerializer: function (params) {
                    return Qs.stringify(params, { arrayFormat: 'brackets' })
                },
                params: {
                    reqUrl: `https://api.yelp.com/v3/businesses/${restaurantID}/reviews`,
                    params: {
                    },
                    proxyHeaders: {
                        'Authorization': `Bearer ${this.state.accessToken}`,
                    },
                    xmlToJSON: false
                }
            });
        });

        Promise.all(reviewPromises).then((promise) => {
            console.log(promise);
            //for each restaurant we get an array of 3 objects - each object has a review (object.text)
            //for each restaurant need to search through the three object.text's for 'slice' and filter out anything that has 'slice' in it
            //return a new array of just the restaurants the restaurants that have 'slice'
        })
    }

    render() {
        return (
            <ul>
                <li></li>
            </ul>
        );
    }
}



// ReactDOM.render(<App />, document.getElementById('app'));
