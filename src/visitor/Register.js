import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import Center from '../util/Center';
import './visitor.css';
import MultiLang from './MultiLang';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			login: '',
			errLogin: '',
			language: 'en',
			errLang: '',
			firstname: '',
			errFirstname: '',
			name: '',
			errName: '',
			mail: '',
			errMail: '',
			passwd: '',
			errPasswd: '',
			preview: ''
		};
		this.handleRegexError = this.handleRegexError.bind(this);
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.attachFile = this.attachFile.bind(this);
		this.ajaxCall = this.ajaxCall.bind(this);
		this.handleKey = this.handleKey.bind(this);
	}
	handleKey(e) {
		if (e.key === "Enter")
			this.ajaxCall();
	}
	handleChange(e, index, value) {
		if (value !== 'en' &&
			value !== 'fr' &&
			value !== 'es') {
			this.setState({errLang: true});
		}
		this.setState({language: value});
	}
	handleRegexError(e) {
		const {messages} = this.context;
		var regex;
		var msg;
		var err = 'err' + e.target.id.charAt(0).toUpperCase() + e.target.id.substring(1);

		//attribute regex and msg alongside id
		if (e.target.id === 'mail') {
			regex = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');
			msg = messages.errors.mail;
		} else if (e.target.id === 'passwd') {
			regex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$');
			msg = messages.errors.passwd;
		} else {
			regex = new RegExp('^[a-z]+$');
			msg = messages.errors.lowercase;
		}


		if (!regex.test(e.target.value)) {
			this.setState({[err]: msg});
		} else {
			this.setState({[err]: ''});
		}
		this.handleFillChar(e);
	}
	ajaxCall(e) {
		console.log('bonjour');
		if (!this.state.errPasswd && !this.state.errMail &&
			!this.state.errLogin && !this.state.errFirstname &&
			!this.state.errName && !this.state.errLang) {
			var data = {
				name: this.state.name,
				firstname: this.state.firstname,
				pseudo: this.state.login,
				password: this.state.passwd,
				email: this.state.mail,
				lang: this.state.language
			};

			var formData = new FormData();

			for (var name in data) {
				formData.append(name, data[name]);
			}
			formData.append('path_img', this.state.img);
			console.log('mdr');
			fetch('/api/user', {
				method: 'POST',
				body: formData
			})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				if (res.data && res.data.token) {
					localStorage.setItem('token', res.data.token);
					browserHistory.push('/');
				} else {
					res.data.forEach(msg => {
						if (msg.path === 'pseudo')
							this.setState({errLogin:msg.message});
						if (msg.path === 'email')
							this.setState({errMail:msg.message});
						console.log(msg);
					})
				}
			})
			.catch(err => {
				console.log(err);
			});
		}
	}
	handleFillChar(e) {
		this.setState({[e.target.id.toLowerCase()]: e.target.value});
	}
	attachFile(e) {
		this.setState({preview: e.target.result});
	}
	handleFileChange(event) {
		console.log('bonjour maman');
		console.log(event.target.files[0]);
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = this.attachFile;
			reader.readAsDataURL(event.target.files[0]);
			console.log(this.state.preview);
			this.setState({img: event.target.files[0]});
		}
	}
	render() {
		const classImg = 'VisitorMarge VisitorImg';
		const {messages} = this.context;
		return (
			<Center
			className="VisitorHeight"
				>
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title={messages.loginPage.register}
						iconElementRight={<MultiLang />}
						/>
					<input
						name="path_img"
						accept=".png,.gif,.jpg,.jpeg"
						className="VisitorMarge"
						type="file"
						onChange={this.handleFileChange}
						/>
					<br/>
					<Center>
						<img
							className={this.state.preview ? classImg : 'VisitorHidden'}
							src={this.state.preview}
							alt=""
							/>
					</Center>
					<Divider/>
					<TextField
						className="VisitorMarge"
						value={this.state.login}
						id="Login"
						onChange={this.handleRegexError}
						floatingLabelText={messages.login}
						hintText={messages.login}
						errorText={this.state.errLogin}
						onKeyDown={this.handleKey}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.firstname}
						onChange={this.handleRegexError}
						id="Firstname"
						floatingLabelText={messages.firstname}
						hintText={messages.firstname}
						errorText={this.state.errFirstname}
						onKeyDown={this.handleKey}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.name}
						id="Name"
						onChange={this.handleRegexError}
						floatingLabelText={messages.name}
						hintText={messages.name}
						errorText={this.state.errName}
						onKeyDown={this.handleKey}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.mail}
						id="mail"
						onChange={this.handleFillChar}
						onBlur={this.handleRegexError}
						onFocus={this.handleRegexError}
						hintText={messages.mail}
						floatingLabelText={messages.mail}
						errorText={this.state.errMail}
						onKeyDown={this.handleKey}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.passwd}
						id="passwd"
						onChange={this.handleFillChar}
						onBlur={this.handleRegexError}
						onFocus={this.handleRegexError}
						hintText={messages.passwd}
						floatingLabelText={messages.passwd}
						type="password"
						errorText={this.state.errPasswd}
						onKeyDown={this.handleKey}
						/>
					<br/>
					<SelectField
						className="VisitorMarge"
						floatingLabelText={messages.language}
						value={this.state.language}
						onChange={this.handleChange}
						errorText={this.state.errLang && messages.lang}
						>
						<MenuItem value="en" primaryText="English"/>
						<MenuItem value="fr" primaryText="Francais"/>
						<MenuItem value="es" primaryText="Castellano"/>
					</SelectField>
					<br/>
					<Center>
						<RaisedButton
							label={messages.loginPage.register}
							className="VisitorMarge"
							disabled={(this.state.errLogin
								|| this.state.errName
								|| this.state.errFirstname
								|| this.state.errMail
								|| this.state.errPasswd) ? true : false}
							onClick={this.ajaxCall}
							/>
						<Link to="/login" className="VisitorMarge">Home</Link>
					</Center>
				</Paper>
			</Center>
		);
	}
}

Register.contextTypes = MultiLang.contextTypes;

export default Register;
