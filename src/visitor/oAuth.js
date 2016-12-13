import '../util/styles.css';
import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import InstagramLogin from 'react-instagram-login';
import Login42 from './42.js';

class Oauth extends Component {
	constructor() {
		super();
		this.cb42 = this.cb42.bind(this);
		this.fail42 = this.fail42.bind(this);
		this.resGoogle = this.resGoogle.bind(this);
		this.resFacebook = this.resFacebook.bind(this);
	}

	cb42(resApi) {
		resApi.json()
		.then(res => {
			if (res.data && res.data.token) {
				localStorage.setItem('token', res.data.token);
				window.location.href = '/';
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
				localStorage.setItem('token', res.data.token);
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
				localStorage.setItem('token', res.data.token);
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
					cssClass='btn-oauth fb'
					fields="locale,last_name,first_name,name,email,picture"
					/>
				<GoogleLogin
					clientId="759345153097-6ohjc192jql9fifkqc19m5on6sj976bs.apps.googleusercontent.com"
					buttonText="Google"
					onSuccess={this.resGoogle}
					onFailure={this.resGoogle}
					className='btn-oauth google'
					scope="https://www.googleapis.com/auth/plus.login"
					/>
				<Login42
					clientId="886dc1e1e56b5d8615b0ef4c566d857f85721e769e1c45d3c03c3b67abd8cbbf"
					onFailure={this.fail42}
					className='btn-oauth q42'
					route="/api/user/42"
					cb={this.cb42}
					redirectUri="http://localhost:3000/login"
					/>
			</div>
		);
	}
}

export default Oauth;
