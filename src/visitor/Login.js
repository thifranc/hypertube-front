import React, {Component} from 'react';
// import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import Center from '../util/Center';
import './visitor.css';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			login: '',
			errLogin: false,
			passwd: '',
			errPasswd: false
		};
		this.handleLogin = this.handleLogin.bind(this);
		this.handlePasswd = this.handlePasswd.bind(this);
		this.fillChar = this.fillChar.bind(this);
	}
	handleLogin(e) {
		var regLowercase = new RegExp('^[a-z]*$');

		if (!regLowercase.test(e.target.value)) {
			this.setState({errLogin: true});
		} else {
			this.setState({errLogin: false});
		}
		this.setState({login: e.target.value});
	}
	handlePasswd() {
		var regPasswd = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$');

		if (!regPasswd.test(this.state.passwd)) {
			this.setState({errPasswd: true});
		} else {
			this.setState({errPasswd: false});
		}
	}
	fillChar(e) {
		this.setState({passwd: e.target.value});
	}
	render() {
		return (
			<Center className="VisitorHeight">
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title="Login"
						/>
					<TextField
						className="VisitorMarge"
						value={this.state.login}
						onChange={this.handleLogin}
						floatingLabelText="Login"
						hintText="Your login"
						errorText={this.state.errLogin && 'Login is only lowercase characters'}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.passwd}
						id="passwd"
						onChange={this.fillChar}
						hintText="Password Field"
						floatingLabelText="Password"
						type="password"
						errorText={this.state.errPasswd && 'Password must have one upper, lower, and digit, and be at least 8 char long'}
						/>
					<br/>
					<Center>
						<RaisedButton
							label="Log In"
							className="VisitorMarge"
							disabled={this.state.errLogin}
							onClick={this.handlePasswd}
							/>
					</Center>
				</Paper>
			</Center>
		);
	}
}

export default Login;
