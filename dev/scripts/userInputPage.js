import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import NavBar from './navBar';
import Loading from 'react-loading-animation';
import LoadingSpinner from './loading.js';
import RestaurantList from './restaurantlist.js';
import Credits from './credits';

class UserInputPage extends React.Component {
    constructor() {
		super();
		this.getMoreRestaurants = this.getMoreRestaurants.bind(this);
	}
	
	getMoreRestaurants() {
		const newOffset = this.props.offset + 50;

		this.props.setOffset(newOffset);
	}

    render() {
    	return (
			<section className="userInputPage">
				<NavBar />
				<div className="wrapper">
					{this.props.header === "shortened" ?
						<header className="compact">
							{this.props.header === "default" ?
								<span className="">
									<p>Looking for great pizza in your area?</p>
									<p>Enter your location to find restaurants near you.</p>
								</span>
								:
								<p className="location">Location:</p>
							}
						</header>
					:
						<header className="">
							{this.props.header === "default" ?
								<span>
									<p>Looking for great pizza in your area?</p>
									<p>Enter your location to find restaurants near you.</p>
								</span>
								:
								<p>Location:</p>
							}
						</header>
					}
					<form action="" onSubmit={this.props.handleSubmit}>
						<label htmlFor="userLocation" className="sr-only">Enter your location</label>
						<input type="text" autoComplete="off" name="userLocation" value={this.props.userLocation} onChange={this.props.handleChange} placeholder="Enter your city"/>
						<button type="submit">Submit</button>
					</form>
					{this.props.header === "shortened" ? 
						<RestaurantList loading={this.props.loading} sliceRestaurants={this.props.sliceRestaurants} noSlice={this.props.noSlice} header={this.props.header} getMoreRestaurants={this.getMoreRestaurants} offset={this.props.offset} />
					: null }
				</div>
			</section>
    	)
    }
}

export default UserInputPage;