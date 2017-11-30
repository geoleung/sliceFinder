import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import Loading from 'react-loading-animation';
import Flickity from 'react-flickity';

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
					<ul>
						{this.props.sliceRestaurants.map((restaurant) => {
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
    	)
    }
}

export default UserInputPage;