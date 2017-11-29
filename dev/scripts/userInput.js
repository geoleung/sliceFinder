import React from 'react';
import axios from 'axios';
import Qs from 'qs';

class UserInputPage extends React.Component {
    constructor() {
      super();
    }
  
    componentDidMount() {
        axios({
          method: 'GET',
          url: 'http://proxy.hackeryou.com',
          dataResponse: 'json',
          paramsSerializer: function (params) {
            return Qs.stringify(params, { arrayFormat: 'brackets' })
          },
          params: {
            reqUrl: 'https://api.yelp.com/v3/businesses/search',
            params: {
              location: 'Miami',
              categories: 'pizza',
              limit: 50,
              // sort_by: 'review_count',
              offset: 51
  
            },
            proxyHeaders: {
              'Authorization': `Bearer ${this.props.token}`,
            },
            xmlToJSON: false
          }
        }).then((result) => {
          const restaurantArray = result.data.businesses;
          // console.log(restaurantIdArray);
  
          let restaurantNameArray = [];
          restaurantArray.map((restaurant) => {
            // console.log(restaurant.id);
            restaurantNameArray.push(restaurant.id);
            this.setState({
              restaurantList: restaurantNameArray
            });
            const reviewPromises = this.state.restaurantList.map((restaurantID) => {
              axios({
                  method: 'GET',
                  url: 'http://proxy.hackeryou.com',
                  dataResponse: 'json',
                  paramsSerializer: function (params) {
                      return Qs.stringify(params, { arrayFormat: 'brackets' })
                  },
                  params: {
                      reqUrl: `https://api.yelp.com/v3/businesses/${restaurantID}/reviews`,
                      params: {
                        total: 50
                      },
                      proxyHeaders: {
                          'Authorization': `Bearer ${this.state.accessToken}`,
                      },
                      xmlToJSON: false
                  }
              }).then((res) => {
                for (let i = 0; i < res.data.reviews.length; i++) {
  
                  console.log(res.data.reviews[i].text);
                }
              });
          });
          // Promise.all(reviewPromises).then((promise) => {
          //     console.log(promise);
              //for each restaurant we get an array of 3 objects - each object has a review (object.text)
              //for each restaurant need to search through the three object.text's for 'slice' and filter out anything that has 'slice' in it
              //return a new array of just the restaurants the restaurants that have 'slice'
          // });
          // })
        // });
      })
    })
    }
    render() {
      return (
        <div>
          Hello!
        </div>
      )
    }
  }

  export default UserInputPage;