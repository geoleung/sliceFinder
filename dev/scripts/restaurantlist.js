import React from 'react';
import ReactDOM from 'react-dom';
import Loading from 'react-loading-animation';
import LoadingSpinner from './loading.js';
import Flickity from 'react-flickity-component';

const RestaurantList = (props) => {
    if (props.loading === true || props.sliceRestaurants === []) {
        return (
            <div className="restaurant-container">
                <LoadingSpinner />
            </div>
        )
    } else {
        const flickityOptions = {
            initialIndex: 1,
            wrapAround: true,
        }
        
        return (
            <div className="restaurant-container">
                <Flickity
                    className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                >
                {props.sliceRestaurants.map((restaurant) => {
                    return (
                        <div className="restaurant-card" key={restaurant.restaurantInfo.id}>
                            <div className="restaurant-info">
                                <h2>{restaurant.restaurantInfo.name}</h2>
                                <p className="price">Price Range: {restaurant.restaurantInfo.price}</p>
                                <div className="address">
                                    <p>{restaurant.restaurantInfo.address[0]}</p>
                                    <p>{restaurant.restaurantInfo.address[1]}</p>
                                    <p>{restaurant.restaurantInfo.address[2]}</p>
                                </div>
                            </div>
                            <div className="restaurant-image">
                                <img src={restaurant.restaurantInfo.image} alt="" />
                            </div>
                        </div>
                    );
                })}
                </Flickity>
            </div>
        );
    }
}

export default RestaurantList;