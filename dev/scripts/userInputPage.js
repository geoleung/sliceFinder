import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import Loading from 'react-loading-animation';
import LoadingSpinner from './loading.js';
import RestaurantList from './restaurantlist.js';

class UserInputPage extends React.Component {
    constructor() {
		super();
    }
    render() {
    	return (
			<div>
				<form action="" onSubmit={this.props.handleSubmit}>
					<input type="text" name="userLocation" value={this.props.userLocation} onChange={this.props.handleChange} />
					<button type="submit">Submit</button>
				</form>
				<RestaurantList loading={this.props.loading} sliceRestaurants={this.props.sliceRestaurants}/>
			</div>
    	)
    }
}

export default UserInputPage;