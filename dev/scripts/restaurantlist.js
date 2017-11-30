import React from 'react';
import ReactDOM from 'react-dom';
import Loading from 'react-loading-animation';
import LoadingSpinner from './loading.js';

const RestaurantList = (props) => {
    if (props.loading === true || props.sliceRestaurants === []) {
        return <LoadingSpinner />
    } else {
        return (
            <ul>
                {props.sliceRestaurants.map((restaurant) => {
                    return (
                        <li key={restaurant.restaurantInfo.id}>
                            <h2>{restaurant.restaurantInfo.name}</h2>
                            <img src={restaurant.restaurantInfo.image} alt="" />
                            <p>Price Range: {restaurant.restaurantInfo.price}</p>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default RestaurantList;