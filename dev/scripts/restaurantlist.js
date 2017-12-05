import React from 'react';
import ReactDOM from 'react-dom';
import Loading from 'react-loading-animation';
import LoadingSpinner from './loading.js';
import Flickity from 'react-flickity-component';

const RestaurantList = (props) => {
    console.log(props);
    if (props.noSlice === true) {
        return (
            <div className="restaurant-container">
                <div className="error-message">
                    <div>
                        <p className="hmm">Hmmm...</p>
                        <p>We're sorry, we couldn't find you any results in your area <span>😳</span></p>
                        <p>Try rephrasing your search and we'll see what we can do!</p>
                        <div className="error-image">
                            <img src="public/assets/logo-coloured.png" alt="Slice Finder company logo"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (props.loading === true || props.sliceRestaurants.length === 0) {
        return (
            <div className="restaurant-container">
                <LoadingSpinner />
            </div>
        )
    } else {
        const flickityOptions = {
            initialIndex: 0,
            wrapAround: true,
            imagesLoaded: true,
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

                                <div className="address">
                                    <p>{restaurant.restaurantInfo.address[0]}</p>
                                    <p>{restaurant.restaurantInfo.address[1]}</p>
                                    <p>{restaurant.restaurantInfo.address[2]}</p>
                                </div>
                                <div className="priceLevel">
                                <p className="price">Price Range: {restaurant.restaurantInfo.price}</p>
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