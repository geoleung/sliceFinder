import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import Loading from 'react-loading-animation';

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
				<Loading isLoading={this.props.load && this.props.sliceRestaurants.size() == 0}>
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
				</Loading>
			</div>
    	)
    }
}

export default UserInputPage;