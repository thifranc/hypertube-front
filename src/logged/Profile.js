import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import Divider from 'material-ui/Divider';

import Center from '../util/Center';
import '../visitor/visitor.css';

class Profile extends Component {
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
		fetch('/api/user/me', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState({
					login: res.data[0].pseudo,
					name: res.data[0].name,
					firstname: res.data[0].firstname,
					mail: res.data[0].email,
					language: res.data[0].lang,
					preview: res.data[0].path_img
				});
			})
			.catch(err => console.log(err));
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
		const {messages} = this.context;
		const classImg = 'VisitorMarge VisitorImg';
		return (
			<Center className="VisitorHeight">
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title={messages.nav.profil}
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

Profile.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func,
	router: React.PropTypes.object
};

export default Profile;
