import React, {Component} from 'react';
// import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import Center from '../util/Center';

const style = {
	height: '100vh'
};

const centered = {
	marginTop: 10,
	marginBottom: 10,
	marginLeft: 150
};

const hidden = {
	display: 'none'
};

const marge = {
	marginLeft: 20,
	marginRight: 20,
	marginTop: 10,
	marginBottom: 10
};

class Login extends Component {
	constructor() {
		super();
		this.state = {
			hidden: true,
			login: '',
			errLogin: false,
			mail: '',
			errMail: false
		};
	}
	handleLogin(e) {
		let regLowercase = new RegExp('^[a-z]*$');

		if (regLowercase.test(e.target.value) === false) {
			this.setState({errLogin: true});
		} else {
			this.setState({errLogin: false});
		}
		this.setState({login: e.target.value});
	}
	handleMail(e) {
		let regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');

		if (regMail.test(e.target.value) === false) {
			this.setState({errMail: true});
		} else {
			this.setState({errMail: false});
		}
	}
	fillChar(e) {
		this.setState({mail: e.target.value});
	}
	handleSwap(e) {
		this.setState((prevState, props) => {
			return {hidden: !prevState.hidden};
		});
		this.setState({errLogin: false});
		this.setState({errMail: false});
	}
	render() {
		return (
			<Center style={style}>
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title="Reset your password"
						/>
					<RaisedButton
						label="Change"
						style={marge}
						onClick={this.handleSwap.bind(this)}
						/>
					<TextField
						style={this.state.hidden ? hidden : marge}
						value={this.state.login}
						id="login"
						onChange={this.handleLogin.bind(this)}
						hintText="Your login"
						floatingLabelText="Login"
						errorText={this.state.errLogin && 'Login is only lowercase characters'}
						/>
					<TextField
						style={this.state.hidden ? marge : hidden}
						value={this.state.mail}
						id="mail"
						onChange={this.fillChar.bind(this)}
						hintText="Your mail"
						floatingLabelText="Mail"
						errorText={this.state.errMail && 'Mail is not correct'}
						/>
					<br/>
					<RaisedButton
						label="Mail me"
						style={centered}
						disabled={this.state.errLogin}
						onClick={this.handleMail.bind(this)}
						/>
				</Paper>
			</Center>
		);
	}
}

export default Login;
