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
import '../visitor/visitor.css';

var	defaultProfile = {
	img: 'http://www.filecluster.com/howto/wp-content/uploads/2014/07/User-Default.jpg',
	login: 'login',
	name: 'name',
	firstname: 'firstname',
	mail: 'mail',
	lastSeen: 6198
};

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
			preview: ''
		};
		this.handleLowercase = this.handleLowercase.bind(this);
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handleValidForm = this.handleValidForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.attachFile = this.attachFile.bind(this);
	}
	componentDidMount() {
		fetch('/profile', {
			method: 'GET'
		})
			.then(res => res.json())
			.then(res => {
				console.log('bonjour mom');
				this.setState({
					login: res.data.login,
					name: res.data.name,
					firstname: res.data.firstname,
					mail: res.data.mail,
					language: res.data.language,
					preview: res.data.img
				});
			})
			.then(() => console.log(this.state.movie))
			.catch(err => {
				console.log(err);
				console.log('ERREUR COMME TOI');
				this.setState({
					login: 'login',
					name: 'name',
					firstname: 'firstname',
					mail: 'mail@lol.fr',
					language: 'en',
					preview:'http://www.filecluster.com/howto/wp-content/uploads/2014/07/User-Default.jpg'
				});
			});
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
		if (!regLowercase.test(e.target.value)) {
			this.setState({[err]: true});
		} else {
			this.setState({[err]: false});
		}
		this.handleFillChar(e);
	}
	handleValidForm(e) {
		e.preventDefault();
		var regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');

		this.setState({
			errLogin: !this.state.login,
			errName: !this.state.name,
			errFirstname: !this.state.firstname,
			errMail: !regMail.test(this.state.mail)
		}, this.ajaxCall);
	}
	ajaxCall() {
		if (!this.state.errMail &&
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
		this.setState({preview: e.target.result});
	}
	handleFileChange(event) {
		console.log(event);
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = this.attachFile;
			reader.readAsDataURL(event.target.files[0]);
		}
	}
	render() {
		const classImg = 'VisitorMarge VisitorImg';
		return (
			<Center className="VisitorHeight">
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title="Your Profile"
						/>
					<input
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
					<Center>
						<RaisedButton
							label="Save changes"
							className="VisitorMarge"
							disabled={this.state.errLogin || this.state.errName || this.state.errFirstname}
							onClick={this.handleValidForm}
							/>
					</Center>
				</Paper>
			</Center>
		);
	}
}

export default Register;
