import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';

class GetRestByReviews extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        axios.get('https://yelp-oauth.herokuapp.com/token', {
            params: {
                "token_type": "Bearer"
            }
        }).then((result) => {
            this.setState({
                accessToken: result.data.response.access_token
            })
            axios({
                method: 'GET',
                url: 'http://proxy.hackeryou.com',
                dataResponse: 'json',
                paramsSerializer: function (params) {
                    return Qs.stringify(params, { arrayFormat: 'brackets' })
                },
                params: {
                    reqUrl: `https://api.yelp.com/v3/businesses/${this.props.restaurantList}/reviews`,
                    params: {
                    },
                    proxyHeaders: {
                        'Authorization': `Bearer ${this.state.accessToken}`,
                    },
                    xmlToJSON: false
                }
            }).then((result) => {
                console.log(result);
            });
        })
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