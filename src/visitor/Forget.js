import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Link} from 'react-router';

import Center from '../util/Center';
import MultiLang from './MultiLang';
import './visitor.css';

class Forget extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
			success: false,
			hidden: true,
			login: '',
			errLogin: false,
			mail: '',
			modalRep:'',
			modalMsg:'',
			errMail: false
		};
		this.handleSwap = this.handleSwap.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleMail = this.handleMail.bind(this);
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handleKey = this.handleKey.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	handleClose() {
		  this.setState({open: false});
	}
	handleKey(e) {
		if (e.key === 'Enter')
			{this.handleMail();}
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
	handleMail() {
		let regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');
		this.setState({
			errMail: !regMail.test(this.state.mail)
		}, this.ajaxCall);
	}
	ajaxCall() {
		var data = {};
		const {messages} = this.context;
		if (this.state.hidden && !this.state.errLogin && this.state.login) {
			data = JSON.stringify({login: this.state.login});
		} else if (!this.state.hidden && !this.state.errMail) {
			data = JSON.stringify({login: this.state.mail});
		}
		if (typeof (data) === 'string') {
			fetch('/api/user/forget', {
				method: 'PATCH',
				body: data
			})
				.then(res => res.json())
				.then(res => {
					console.log(res);
					if (res.statusCode === 200) {
						this.setState({open: true, modalRep:messages.success, 
						modalMsg:messages.forget.success
						});
					} else {
						this.setState({
							open: true, modalRep:messages.error,
							modalMsg:messages.forget.fail
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
	handleFillChar(e) {
		this.setState({mail: e.target.value});
	}
	handleSwap() {
		this.setState(prevState => {
			return {hidden: !prevState.hidden};
		});
		this.setState({errLogin: false});
		this.setState({errMail: false});
	}
	render() {
		const {messages} = this.context;
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
					title={this.state.modalRep}
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					>
					{this.state.modalMsg}
				</Dialog>
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title={messages.forget.forget}
						iconElementRight={<MultiLang/>}
						/>
					<RaisedButton
						label={messages.forget.change}
						className="VisitorMarge"
						onClick={this.handleSwap}
						/>
					{this.state.hidden ?
						<TextField
							className={this.state.hidden ? 'VisitorHidden' : 'VisitorMarge'}
							value={this.state.login}
							id="login"
							onChange={this.handleLogin}
							hintText={messages.login}
							floatingLabelText={messages.login}
							errorText={this.state.errLogin && messages.errors.lowercase}
							onKeyDown={this.handleKey}
							/> :
							<TextField
								className={this.state.hidden ? 'VisitorMarge' : 'VisitorHidden'}
								value={this.state.mail}
								id="mail"
								onChange={this.handleFillChar}
								hintText={messages.mail}
								floatingLabelText={messages.mail}
								errorText={this.state.errMail && messages.errors.mail}
								onKeyDown={this.handleKey}
								/>
					}
					<br/>
					<RaisedButton
						label={messages.forget.mailMe}
						className="VisitorCentered"
						disabled={this.state.errLogin}
						onClick={this.handleMail}
						/>
					<Link to="/login" className="VisitorMarge">Home</Link>
				</Paper>
			</Center>
		);
	}
}

Forget.contextTypes = MultiLang.contextTypes;

export default Forget;
