import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import SplashPage from './splashPage.js';
import UserInputPage from './userInputPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Loading from 'react-loading-animation';
import LoadingSpinner from './loading.js';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			accessToken: '',
			userLocation: '',
			restaurantList: [],
			isLoading: false,
			header: 'default',
			noSlice: 'false',
			apiOffset: 1
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getPizza = this.getPizza.bind(this);
		this.setOffset = this.setOffset.bind(this);
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

		this.setState({
			isLoading: true,
			header: 'shortened',
			noSlice: false
		});

		this.getPizza();
	}

	getPizza() {
		axios({
			method: 'GET',
			url: 'https://proxy.hackeryou.com',
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
					offset: this.state.apiOffset
				},
				proxyHeaders: {
					'Authorization': `Bearer ${this.state.accessToken}`,
				},
				xmlToJSON: false
			}
		}).then((result) => {
			const restaurantArray = result.data.businesses;
	
			//when there are accents in the restaurant IDs we get an error back on the second API call so have to replace any accents with just the plain character
			let restaurantInfoArray = restaurantArray.map((restaurant) => {
				restaurant.id = restaurant.id.replace(/[ÀÁÂÃÄÅĀ]/g, 'A');
				restaurant.id = restaurant.id.replace(/[àáâãäåā]/g, 'a');
				restaurant.id = restaurant.id.replace(/[ÈÉÊË]/g, 'E');
				restaurant.id = restaurant.id.replace(/[éêèë]/g, 'e');
				restaurant.id = restaurant.id.replace(/[ÍÎÌÏ]/g, 'I');
				restaurant.id = restaurant.id.replace(/[íîìï]/g, 'i');
				restaurant.id = restaurant.id.replace(/[ÓÔÒØÕÖŐ]/g, 'O');
				restaurant.id = restaurant.id.replace(/[óôòøõöő]/g, 'o');
				restaurant.id = restaurant.id.replace(/[ÚÛÙÜŰ]/g, 'U');
				restaurant.id = restaurant.id.replace(/[úûùüű]/g, 'u');
				restaurant.id = restaurant.id.replace(/Ç/g, 'C');
				restaurant.id = restaurant.id.replace(/ç/g, 'c');
				restaurant.id = restaurant.id.replace(/Ñ/g, 'N');
				restaurant.id = restaurant.id.replace(/ñ/g, 'n');
				restaurant.id = restaurant.id.replace(/[ÝŸ]/g, 'Y');
				restaurant.id = restaurant.id.replace(/[ýÿ]/g, 'y');
				
				return {
					id: restaurant.id,
					name: restaurant.name,
					image: restaurant.image_url,
					address: restaurant.location.display_address,
					price: restaurant.price
				}
			})
			
			const reviewPromises = restaurantInfoArray.map((restaurant) => {
				return axios({
					method: 'GET',
					url: 'https://proxy.hackeryou.com',
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
					}).join()
				});
	
				const restaurantListWithReviews = justReviewsArray.map((reviewList, i) => {
					return {
						restaurantInfo: restaurantInfoArray[i],
						reviews: reviewList
					}
				});
	
				const restaurantsWithSlice = restaurantListWithReviews.filter((restaurant) => {
					const slice = /[Ss]lice/;
					return slice.exec(restaurant.reviews); 
				})
	
				this.setState({
					restaurantList: restaurantsWithSlice,
					isLoading: false
				});
			});
		}).catch((error) => {
			this.setState({
				noSlice: true
			});
		})
	}
	
	setOffset(newOffset) {
		this.setState({
			apiOffset: newOffset,
			isLoading: true
		}, this.getPizza);
	}

	render() {
		return (
			<Router>
			<div>
				<Switch>
				{/* Adding paths to different "pages". We use "render" when referencing UserInputPage in order to pass down the props that it needs*/}
				<Route exact path="/" component={SplashPage} />
				<Route exact path="/app" render={(props) => (
					<UserInputPage {...props} token={this.state.accessToken} handleChange={this.handleChange} handleSubmit={this.handleSubmit} userLocation={this.state.userLocation} sliceRestaurants={this.state.restaurantList} loading={this.state.isLoading} header={this.state.header} noSlice={this.state.noSlice} setOffset={this.setOffset} offset={this.state.apiOffset} />
				)}/>
				</Switch>
			</div>
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
