import React from 'react';
import ReactDOM from 'react-dom';
import Loading from 'react-loading-animation';
import LoadingSpinner from './loading.js';
import Flickity from 'react-flickity';

const RestaurantList = (props) => {
    if (props.loading === true || props.sliceRestaurants === []) {
        return <LoadingSpinner />
    } else {
        const flickityOptions = {
            initialIndex: 0,
            cellSelector: ul,
            accessibility: true,
            pageDots: true,
            wrapAround: true,
            autoPlay: 3000 // default false 
        }
        return (
            <Flickity className={ 'carousel' } elementType={ 'div' } options={ flickityOptions } disableImagesLoaded={ false }>
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
            </Flickity>
        );
        
    }
}

export default RestaurantList;