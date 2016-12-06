import React, {Component} from 'react';

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

class Register extends Component {
	constructor() {
		super();
		this.state = {
			login: '',
			errLogin: false,
			language: 'en',
			errLang: false,
			firstname: '',
			errFirstname: false,
			name: '',
			errName: false,
			mail: '',
			errMail: false,
			passwd: '',
			errPasswd: false,
			preview: ''
		};
		this.handleLowercase = this.handleLowercase.bind(this);
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handleValidForm = this.handleValidForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.attachFile = this.attachFile.bind(this);
	}
	handleChange(e, index, value) {
		if (value !== 'en' &&
			value !== 'fr' &&
			value !== 'es') {
			this.setState({errLang: true});
		}
		this.setState({language: value});
	}
	handleLowercase(e) {
		var regLowercase = new RegExp('^[a-z]*$');
		var err = 'err' + e.target.id.charAt(0).toUpperCase() + e.target.id.substring(1);

		this.setState({[err]: !regLowercase.test(e.target.value)});
		this.handleFillChar(e);
	}
	handleValidForm(e) {
		e.preventDefault();
		var regPasswd = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$');
		var regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');

		this.setState({
			errLogin: !this.state.login,
			errName: !this.state.name,
			errFirstname: !this.state.firstname,
			errPasswd: !regPasswd.test(this.state.passwd),
			errMail: !regMail.test(this.state.mail)
		}, this.ajaxCall);
	}
	ajaxCall() {
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

			for (name in data) {
				formData.append(name, data[name]);
			}
			formData.append('path_img', this.state.img);
			console.log('looll', formData);
			console.log(this.state.img);

			for (var pair of formData.entries()) {
				console.log(pair[0] + ', ' + pair[1]);
			}
			fetch('/api/user', {
				method: 'POST',
				body: formData
			})
			.then(res => res.json())

			.then(res => {
				console.log(res);
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
		const {messages, lang} = this.context;
		return (
			<Center className="VisitorHeight">
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title={messages.loginPage.register}
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
						onChange={this.handleLowercase}
						floatingLabelText={messages.login}
						hintText={messages.login}
						errorText={this.state.errLogin && messages.errors.lowercase}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.firstname}
						onChange={this.handleLowercase}
						id="Firstname"
						floatingLabelText={messages.firstname}
						hintText={messages.firstname}
						errorText={this.state.errFirstname && messages.errors.lowercase}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.name}
						id="Name"
						onChange={this.handleLowercase}
						floatingLabelText={messages.name}
						hintText={messages.name}
						errorText={this.state.errName && messages.errors.lowercase}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.mail}
						id="mail"
						onChange={this.handleFillChar}
						hintText={messages.mail}
						floatingLabelText={messages.mail}
						errorText={this.state.errMail && messages.errors.mail}
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
						/>
					<br/>
					<SelectField
						className="VisitorMarge"
						floatingLabelText={messages.language}
						value={this.state.language}
						onChange={this.handleChange}
						errorText={this.state.errLang && 'You have to choose between the available languages'}
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
							disabled={this.state.errLogin || this.state.errName || this.state.errFirstname}
							onClick={this.handleValidForm}
							/>
						<Link to="/login" className="VisitorMarge">Home</Link>
					</Center>
				</Paper>
			</Center>
		);
	}
}

Register.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func,
	router: React.PropTypes.object
};

export default Register;
