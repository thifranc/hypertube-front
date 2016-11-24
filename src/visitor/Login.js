import React, {Component} from 'react';
//import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


import Center from '../util/Center';

const style = {
	height: '100vh'
};

const marge = {
	  marginLeft: 20,
	  marginRight: 20,
	  marginTop: 10,
	  marginBottom: 10,
};

class Login extends Component {
	constructor() {
		super();
		this.state = {
			login: '',
			errLogin: false,
			passwd: '',
			errPasswd: false
		};
	}
	handleLogin(e) {
		var regLowercase = new RegExp('^[a-z]*$');
		if (!regLowercase.test(e.target.value))
			this.setState({errLogin: true});
		else
			this.setState({errLogin: false});
		this.setState({login: e.target.value});
	}
	handlePasswd(e) {
		var regPasswd = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$');

		if (!regPasswd.test(document.getElementById('passwd').value))
			this.setState({errPasswd: true});
		else
			this.setState({errPasswd: false});
	}
	fillChar(e) {
		this.setState({passwd: e.target.value});
	}
	render() {
		return (
			<Center style={style}>
				<Paper zDepth={2}>
				<AppBar
				showMenuIconButton={false}
			    title='Login'
			  />
					<TextField style={marge}
						value={this.state.login}
						onChange={this.handleLogin.bind(this)}	
						floatingLabelText='Login'
						hintText='Your login'
						errorText={this.state.errLogin && 'Login is only lowercase characters'}
						/>
					<br/>
					<TextField style={marge}
						value={this.state.passwd}
						id='passwd'
						onChange={this.fillChar.bind(this)}	
						hintText='Password Field'
						floatingLabelText='Password'
						type='password'
						errorText={this.state.errPasswd && 'Password must have one upper, lower, and digit, and be at least 8 char long'}
						/>
					<br/>
				    <RaisedButton
						label='Log In'
						style={marge}
						disabled={this.state.errLogin}
						onClick={this.handlePasswd.bind(this)}
						/>
				</Paper>
			</Center>
		);
	}
}

export default Login;
