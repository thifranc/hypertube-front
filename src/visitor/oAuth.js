import React, {Component} from 'react';
import {browserHistory} from 'react-router';

// import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login'; // create button
import InstagramLogin from 'react-instagram-login';
import Login42 from './42.js';

class Oauth extends Component {
	constructor() {
		super();
		this.fail42 = this.fail42.bind(this);
		this.cb42 = this.cb42.bind(this);
		this.resGoogle = this.resGoogle.bind(this);
		this.resInstagram = this.resInstagram.bind(this);
		this.resFacebook = this.resFacebook.bind(this);
	}
	resInstagram(res) {
		  console.log('instagram said ', res);
	}
	cb42(resApi) {
		resApi.json()
		.then(res => {
			if (res.data && res.data.token) {
				localStorage.setItem('token', res.token);
				browserHistory.push('/');
			}
		})
		.catch(err => {
			console.log('Error : ', err);
		});
	}

	resFacebook(response) {
		if (response.status === 'not_authorized' || !response.email)
			{return;}
		const data = JSON.stringify(response);

		fetch('/api/user/facebook', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: data
		})
		.then(res => res.json())
		.then(res => {
			if (res.data && res.data.token) {
				localStorage.setItem('token', res.token);
				browserHistory.push('/');
			}
		})
		.catch(err => {
			console.log(err);
		});
	}

	resGoogle(response) {
		if (response.type === 'tokenFailed')
			{return;}
		const data = JSON.stringify(response);
		fetch('/api/user/google', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: data
		})
		.then(res => res.json())
		.then(res => {
			if (res.data && res.data.token) {
				localStorage.setItem('token', res.token);
				browserHistory.push('/');
			}
		})
		.catch(err => {
			console.log(err);
		});
	}

	fail42(response) {
		console.log('FAIL42 ==>', response);
		browserHistory.push('/');
	}

	render() {
		return (
			<div>
				<FacebookLogin
					textButton="Facebook"
					appId="592965297562891"
					callback={this.resFacebook}
					// cssClass = "my-facebook-button-class"
					fields="locale,last_name,first_name,name,email,picture"
					/>
				<GoogleLogin
					clientId="759345153097-6ohjc192jql9fifkqc19m5on6sj976bs.apps.googleusercontent.com"
					buttonText="Google"
					onSuccess={this.resGoogle}
					onFailure={this.resGoogle}
					scope="https://www.googleapis.com/auth/plus.login"
					/>
				<Login42
					clientId="886dc1e1e56b5d8615b0ef4c566d857f85721e769e1c45d3c03c3b67abd8cbbf"
					onFailure={this.fail42}
					route="/api/user/42"
					cb={this.cb42}
					redirectUri="http://localhost:3000/login"
					/>
				<InstagramLogin
					clientId="3cf112fd1d344cd2af5015a4a35ac755"
					buttonText="Instagram"
					onSuccess={this.resInstagram}
					onFailure={this.resInstagram}
					/>,
			</div>
		);
	}
}

export default Oauth;
