import React from 'react';
import axios from 'axios';
import Qs from 'qs';

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
			</div>
    	)
    }
}

export default UserInputPage;