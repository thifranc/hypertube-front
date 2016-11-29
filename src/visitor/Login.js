import React, {Component} from 'react';
// import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {fullWhite, blue800 as facebookColor, lightBlue200 as twitterColor, grey800 as schoolColor} from 'material-ui/styles/colors';
import {Link} from 'react-router';

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
		this.handleFillChar = this.handleFillChar.bind(this);
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

		this.setState({
			errPasswd: !regPasswd.test(this.state.passwd)
		}, this.ajaxCall);
	}
	ajaxCall() {
		console.log(this.state);
		if (!this.state.errPasswd) {
			console.log('all valid');
			// insert AJAX call here
		}
	}
	handleFillChar(e) {
		this.setState({passwd: e.target.value});
	}
	render() {
		const {messages, lang} = this.context;
		return (
			<Center className="VisitorHeight">
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title={messages.loginPage.log}
						/>
					<RaisedButton
						className="VisitorMarge"
						labelColor={fullWhite}
						label="Facebook"
						backgroundColor={facebookColor}
						/>
					<RaisedButton
						className="VisitorMarge"
						labelColor={fullWhite}
						label="42"
						backgroundColor={schoolColor}
						/>
					<RaisedButton
						className="VisitorMarge"
						labelColor={fullWhite}
						label="Twitter"
						backgroundColor={twitterColor}
						/>
					<Divider/>
					<Center>
						<TextField
							className="VisitorMarge"
							value={this.state.login}
							onChange={this.handleLogin}
							floatingLabelText={messages.login}
							hintText={messages.login}
							errorText={this.state.errLogin && 'Login is only lowercase characters'}
							/>
						<br/>
						<TextField
							className="VisitorMarge"
							value={this.state.passwd}
							id="passwd"
							onChange={this.handleFillChar}
							hintText={messages.passwd}
							floatingLabelText={messages.passwd}
							type="password"
							errorText={this.state.errPasswd && 'Password must have one upper, lower, and digit, and be at least 8 char long'}
							/>
						<br/>
						<Center>
							<RaisedButton
								label={messages.loginPage.log}
								className="VisitorMarge"
								disabled={this.state.errLogin}
								onClick={this.handlePasswd}
								/>
						</Center>
						<Divider/>
						<Center>
							<Link to="/register" className="VisitorMarge">{messages.loginPage.register}</Link>
							<Link to="/forget" className="VisitorMarge">Reset password</Link>
						</Center>
					</Center>
				</Paper>
			</Center>
		);
	}
}

Login.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func,
	router: React.PropTypes.object
};

export default Login;
