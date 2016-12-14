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
			passwd: ''
		};
		this.handlePasswd = this.handlePasswd.bind(this);
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handleKey = this.handleKey.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	handleOpen() {
		  this.setState({open: true});
	}
	handleClose() {
		  this.setState({open: false});
	}
	handleKey(e) {
		if (e.key === 'Enter') {
			this.handlePasswd();
		}
	}
	handlePasswd() {
		var regPasswd = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$');
		var regLowercase = new RegExp('^[a-z]*$');

		if (!regLowercase.test(this.state.login) ||
			!regPasswd.test(this.state.passwd)) {
				this.setState({open: true});
			} else {
				this.ajaxCall();
			}
	}
	ajaxCall() {
		if (this.state.passwd && this.state.login) {
			
			var formData = new FormData();
			formData.append('login', this.state.login);
			formData.append('password', this.state.passwd);
			fetch('/api/user/auth/hypertube', {
				method: 'POST',
				body: formData
			})
			.then(res => res.json())
			.then(res => {
				if (res.data && typeof (res.data.token) != 'undefined') {
					localStorage.setItem('token', res.data.token);
					browserHistory.push('/');
				} else {
					this.setState({open: true});
				}
			})
			.catch(err => console.log);
		}
	}
	handleFillChar(e) {
		this.setState({[e.target.id]: e.target.value});
	}

	render() {
		const {messages, lang} = this.context;
		const actions = [
			      <FlatButton
				label="OK"
				primary
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
						iconElementRight={<MultiLang/>}
						/>
					<Oauth/>
					<Divider/>
					<Center>
						<TextField
							className="VisitorMarge"
							id="login"
							value={this.state.login}
							onChange={this.handleFillChar}
							floatingLabelText={messages.login}
							hintText={messages.login}
							onKeyDown={this.handleKey}
							/>
						<br/>
						<TextField
							className="VisitorMarge"
							id="passwd"
							value={this.state.passwd}
							onChange={this.handleFillChar}
							hintText={messages.passwd}
							floatingLabelText={messages.passwd}
							type="password"
							onKeyDown={this.handleKey}
							/>
						<br/>
						<Center>
							<RaisedButton
								label={messages.loginPage.log}
								className="VisitorMarge"
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
