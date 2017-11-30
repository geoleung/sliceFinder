import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import NavBar from './navBar';

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
						<p>Looking for great pizza in your area?</p>
						<p>Enter your location to find restaurants near you.</p>
					</header>
					<form action="" onSubmit={this.props.handleSubmit}>
						<input type="text" name="userLocation" value={this.props.userLocation} onChange={this.props.handleChange} placeholder="Street address/City/Country"/>
						<button type="submit">Submit</button>
					</form>

					<ul>
						{this.props.sliceRestaurants.map((restaurant) => {
							console.log(restaurant);
							return (
								<li>
									<h2>{restaurant.restaurantInfo.name}</h2>
									<img src={restaurant.restaurantInfo.image} alt=""/>
									<p>Price Range: {restaurant.restaurantInfo.price}</p>
								</li>
							);
						})}
					</ul>
				</div>
			</section>
    	)
    }
}

export default UserInputPage;