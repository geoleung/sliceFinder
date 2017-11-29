import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';

class GetRestByReviews extends React.Component {
    constructor() {
        super();
        this.state = {
            namesArray: []
        }
        this.searchReviews = this.searchReviews.bind(this);
    }
    searchReviews() {
        this.setState({
            namesArray: this.props.restaurantNames
        })
        // let reviewPromises = this.state.namesArray;
        this.state.namesArray.map((restaurantID) => {
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
                        'Authorization': `Bearer ${this.props.token}`,
                    },
                    xmlToJSON: false
                }
            }).then((result) => {
                console.log(result);
            });
        });
        Promise.all(reviewPromises).then((promise) => {
            console.log(promise);
            //for each restaurant we get an array of 3 objects - each object has a review (object.text)
            //for each restaurant need to search through the three object.text's for 'slice' and filter out anything that has 'slice' in it
            //return a new array of just the restaurants the restaurants that have 'slice'
        });
    }
    render() {
        return (
            <div>
                Getting reviews...
            </div>

        )
    }
}

export default GetRestByReviews;