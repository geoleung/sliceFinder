import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
// import SplashPage from './splashPage';
import UserInputPage from './userInputPage';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      accessToken: '',
      userLocation: '',
      restaurantList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get('https://yelp-oauth.herokuapp.com/token', {
      params: {
        "token_type": "Bearer"
    }
    }).then((result) => {
      this.setState({
        accessToken: result.data.response.access_token
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();
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
          location: this.state.userLocation,
          categories: 'pizza',
          limit: 50,
          // sort_by: 'review_count',
          // offset: 51

        },
        proxyHeaders: {
          'Authorization': `Bearer ${this.state.accessToken}`,
        },
        xmlToJSON: false
      }
    }).then((result) => {
      // console.log(result);
      const restaurantArray = result.data.businesses;
      // console.log(restaurantIdArray);

      let restaurantInfoArray = restaurantArray.map((restaurant) => {

        return {
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.image_url,
          address: restaurant.location.display_address,
          price: restaurant.price
        }
        
        // this.setState({
        //   restaurantList: restaurantNameArray
        // });
    //     const reviewPromises = this.state.restaurantList.map((restaurantID) => {
    //       axios({
    //           method: 'GET',
    //           url: 'http://proxy.hackeryou.com',
    //           dataResponse: 'json',
    //           paramsSerializer: function (params) {
    //               return Qs.stringify(params, { arrayFormat: 'brackets' })
    //           },
    //           params: {
    //               reqUrl: `https://api.yelp.com/v3/businesses/${restaurantID}/reviews`,
    //               params: {
    //                 total: 50
    //               },
    //               proxyHeaders: {
    //                   'Authorization': `Bearer ${this.state.accessToken}`,
    //               },
    //               xmlToJSON: false
    //           }
    //       }).then((res) => {
    //         for (let i = 0; i < res.data.reviews.length; i++) {

    //           console.log(res.data.reviews[i].text);
    //         }
          // });
      // });
    })
    console.log(restaurantInfoArray);
  })
  }

    render() {
      return (
        <div>
          Hello
          {/* <SplashPage /> */}
          <UserInputPage token={this.state.accessToken} handleChange={this.handleChange} handleSubmit={this.handleSubmit} userLocation={this.state.userLocation} />
        </div>
      )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
