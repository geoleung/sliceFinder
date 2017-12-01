import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import NavBar from './navBar';
import Loading from 'react-loading-animation';
import LoadingSpinner from './loading.js';
import RestaurantList from './restaurantlist.js';

class UserInputPage extends React.Component {
    constructor() {
		super();
		
	}
	
    render() {
    	return (
			<section className="userInputPage">
				<NavBar />
				<div className="wrapper">
					<header>
						{this.props.header === "default" ? 
							<span>
								<p>Looking for great pizza in your area?</p>
								<p>Enter your location to find restaurants near you.</p> 
							</span>
							:
							<p>Location:</p>
						}
					</header>
					<form action="" onSubmit={this.props.handleSubmit}>

						<input type="text" autoComplete="off" name="userLocation" value={this.props.userLocation} onChange={this.props.handleChange} placeholder="Street address/City/Country"/>
						<button type="submit">Submit</button>
					</form>

					{this.props.header === "shortened" ? 
						<RestaurantList loading={this.props.loading} sliceRestaurants={this.props.sliceRestaurants} noSlice={this.props.noSlice} />
					: null }
				</div>
			</section>
    	)
    }
}

export default UserInputPage;