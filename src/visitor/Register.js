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
var FileInput = require('react-file-input');

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
		this.handleFileChange= this.handleFileChange.bind(this);
		this.attachFile= this.attachFile.bind(this);
	}
	handleChange(e, index, value) {
		if (value !== 'en' &&
			value !== 'fr' &&
			value !== 'es')
			this.setState({errLang: true});
		this.setState({language:value});
	}
	handleLowercase(e) {
		var regLowercase = new RegExp('^[a-z]*$');
		var err = 'err' + e.target.id.charAt(0).toUpperCase() + e.target.id.substring(1);

		this.setState({[err]: !regLowercase.test(e.target.value)});
		if (!regLowercase.test(e.target.value)) {
			this.setState({[err]: true});
		} else {
			this.setState({[err]: false});
		}
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
			console.log('all valid');
			// insert AJAX call here
		}
	}
	handleFillChar(e) {
		this.setState({[e.target.id.toLowerCase()]: e.target.value});
	}
	attachFile(e) {
		this.setState({preview:e.target.result});
	}
	handleFileChange (event) {
		 if (event.target.files && event.target.files[0]) {
			         var reader = new FileReader();
			         reader.onload = this.attachFile;
			         reader.readAsDataURL(event.target.files[0]);
			     }
	}
	render() {
		const classImg = "VisitorMarge VisitorImg";
		const classForm = "VisitorMarge VisitorForm";
		return (
			<Center className="VisitorHeight">
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title="Register"
						/>
				        <form
							className={classForm}
							>
					          <FileInput
									placeholder="Choose file"
				                    accept=".png,.gif,.jpg,.jpeg"
				                    onChange={this.handleFileChange} />
					        </form>
							<img
								className={classImg}
								src={this.state.preview}
								alt="Your Image"/>
					<Divider/>
					<TextField
						className="VisitorMarge"
						value={this.state.login}
						id="Login"
						onChange={this.handleLowercase}
						floatingLabelText="Login"
						hintText="Your login"
						errorText={this.state.errLogin && 'Login is only lowercase characters'}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.firstname}
						onChange={this.handleLowercase}
						id="Firstname"
						floatingLabelText="Firstname"
						hintText="Firstname"
						errorText={this.state.errFirstname && 'Firstname is only lowercase characters'}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.name}
						id="Name"
						onChange={this.handleLowercase}
						floatingLabelText="Name"
						hintText="Name"
						errorText={this.state.errName && 'Name is only lowercase characters'}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.mail}
						id="mail"
						onChange={this.handleFillChar}
						hintText="Mail"
						floatingLabelText="Mail"
						errorText={this.state.errMail && 'Mail is not correct'}
						/>
					<br/>
					<TextField
						className="VisitorMarge"
						value={this.state.passwd}
						id="passwd"
						onChange={this.handleFillChar}
						hintText="Password Field"
						floatingLabelText="Password"
						type="password"
						errorText={this.state.errPasswd && 'Password must have one upper, lower, and digit, and be at least 8 char long'}
						/>
					<br/>
					  <SelectField
						className="VisitorMarge"
						floatingLabelText="Language"
						value={this.state.language}
						onChange={this.handleChange}
						errorText={this.state.errLang && 'You have to choose between the available languages'}
					  >
						<MenuItem value="en" primaryText="English" />
						<MenuItem value="fr" primaryText="Francais" />
						<MenuItem value="es" primaryText="Castellano" />
					  </SelectField>
					<br/>
					<Center>
						<RaisedButton
							label="Register"
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

export default Register;
