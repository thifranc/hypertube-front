import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
// import {fullWhite, blue800 as facebookColor, lightBlue200 as twitterColor, grey800 as schoolColor} from 'material-ui/styles/colors';
import {Link} from 'react-router';

import Center from '../util/Center';
import MultiLang from './MultiLang';
import './visitor.css';

import Oauth from './oAuth.js';


class Login extends Component {
	constructor() {
		super();
		this.state = {
			login: '',
			open: false,
			errLogin: false,
			passwd: '',
			errPasswd: false
		};
		this.handleLogin = this.handleLogin.bind(this);
		this.handlePasswd = this.handlePasswd.bind(this);
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handleKey = this.handleKey.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
  handleOpen() {
		  this.setState({open: true});
		};
  handleClose() {
		  this.setState({open: false});
		};
	handleKey(e) {
		if (e.key === "Enter")
			this.ajaxCall();
	}
	handleLogin(e) {
		var regLowercase = new RegExp('^[a-z]*$');

		if (!regLowercase.test(e.target.value))
			this.setState({errLogin: true});
		else
			this.setState({errLogin: false});
		this.setState({login: e.target.value});
	}
	handlePasswd() {
		var regPasswd = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$');

		this.setState({
			errPasswd: !regPasswd.test(this.state.passwd)
		}, this.ajaxCall);
	}
	ajaxCall() {
		if (!this.state.errPasswd && !this.state.errLogin) {
			fetch('/api/user/auth/hypertube/' + this.state.login + '/' + this.state.passwd, {
				method: 'GET'
			})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				if (res.data && typeof(res.data.token) != "undefined") {
					localStorage.setItem('token', res.data.token);
					browserHistory.push('/');				
				} else {
					this.setState({open:true});
				}
			})
			.catch(err => console.log);
		}
	}
	handleFillChar(e) {
		this.setState({passwd: e.target.value});
	}

	render() {
		const {messages, lang} = this.context;
		const actions = [
			      <FlatButton
			        label={messages.cancel}
			        primary={true}
			        onTouchTap={this.handleClose}
			      />
			    ];
		return (
			<Center className="VisitorHeight">
				<Dialog
			          title="Error"
			          actions={actions}
			          modal={false}
			          open={this.state.open}
			          onRequestClose={this.handleClose}
			        >
				{messages.loginPage.fail}
				</Dialog>
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title={messages.loginPage.log}
						iconElementRight={<MultiLang />}
						 />
					<Oauth />
					<Divider/>
					<Center>
						<TextField
							className="VisitorMarge"
							value={this.state.login}
							onChange={this.handleLogin}
							floatingLabelText={messages.login}
							hintText={messages.login}
							errorText={this.state.errLogin && messages.errors.lowercase}
							onKeyDown={this.handleKey}
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
							errorText={this.state.errPasswd && messages.errors.passwd}
							onKeyDown={this.handleKey}
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
							<Link to="/forget" className="VisitorMarge">{messages.loginPage.reset}</Link>
						</Center>
					</Center>
				</Paper>
			</Center>
		);
	}
}

Login.contextTypes = MultiLang.contextTypes;

export default Login;
