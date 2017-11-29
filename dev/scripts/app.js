import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import SplashPage from './splashPage.js';
import UserInputPage from './userInputPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			accessToken: '',
			userLocation: '',
			restaurantList: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
		})
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		axios({
			method: 'GET',
			url: 'http://proxy.hackeryou.com',
			dataResponse: 'json',
			paramsSerializer: function (params) {
				return Qs.stringify(params, { arrayFormat: 'brackets' });
			},
			params: {
				reqUrl: 'https://api.yelp.com/v3/businesses/search',
				params: {
					location: this.state.userLocation,
					categories: 'pizza',
					limit: 50,
				},
				proxyHeaders: {
					'Authorization': `Bearer ${this.state.accessToken}`,
				},
				xmlToJSON: false
			}
		}).then((result) => {
			const restaurantArray = result.data.businesses;

			let restaurantInfoArray = restaurantArray.map((restaurant) => {
				return {
					id: restaurant.id,
					name: restaurant.name,
					image: restaurant.image_url,
					address: restaurant.location.display_address,
					price: restaurant.price
				}
			})

			this.setState({
				restaurantList: restaurantInfoArray
			});

			const reviewPromises = this.state.restaurantList.map((restaurant) => {
				return axios({
					method: 'GET',
					url: 'http://proxy.hackeryou.com',
					dataResponse: 'json',
					paramsSerializer: function (params) {
						return Qs.stringify(params, { arrayFormat: 'brackets' })
					},
					params: {
						reqUrl: `https://api.yelp.com/v3/businesses/${restaurant.id}/reviews`,
						params: {
							total: 50
						},
						proxyHeaders: {
							'Authorization': `Bearer ${this.state.accessToken}`,
						},
						xmlToJSON: false
					}
				})
			})

			Promise.all(reviewPromises).then((response) => {
				const reviewsArray = response.map((restaurant) => {
					return restaurant.data.reviews;
				});

				const justReviewsArray = reviewsArray.map((restaurant) => {
					return restaurant.map((reviews) => {
						return reviews.text;
					})
				});

				const restaurantListWithReviews = justReviewsArray.map((reviewList, i) => {
					return {
						restaurantInfo: this.state.restaurantList[i],
						reviews: reviewList
					}
				});

				this.setState({
					restaurantList: restaurantListWithReviews,
				});
			});
		});
	}

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Adding paths to different "pages". We use "render" when referencing UserInputPage in order to pass down the props that it needs*/}
            <Route exact path="/" component={SplashPage} />
            <Route exact path="/app" render={(props) => (
              <UserInputPage {...props} token={this.state.accessToken} handleChange={this.handleChange} handleSubmit={this.handleSubmit} userLocation={this.state.userLocation} />
            )}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
