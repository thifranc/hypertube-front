import '../util/styles.css';
import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import Center from '../util/Center';

class Profile extends Component {
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
			img: '',
			open: false,
			modalRep:'',
			modalMsg:'',
			provider:'',
			preview: ''
		};
		this.handleRegexError = this.handleRegexError.bind(this);
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.attachFile = this.attachFile.bind(this);
		this.ajaxCall = this.ajaxCall.bind(this);
		this.handleKey = this.handleKey.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	handleClose() {
		  this.setState({open: false});
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
			let path;
			(res.data.provider !== 'hypertube') ?
				path = res.data.path_img :
				(res.data.path_img === null) ?
					path = 'http://localhost:4242/picture/default.jpg' : path = '/picture/' + res.data.path_img;
			this.setState({
				login: res.data.pseudo,
				name: res.data.name.toLowerCase(),
				firstname: res.data.firstname.toLowerCase(),
				mail: res.data.email,
				language: res.data.lang,
				provider: res.data.provider,
				preview: path
			});
		})
		.catch(err => console.log(err));
	}
	handleKey(e) {
		if (e.key === 'Enter')
			{this.ajaxCall();}
	}
	handleRegexError(e) {
		const {messages} = this.context;
		var regex;
		var msg;
		var err = 'err' + e.target.id.charAt(0).toUpperCase() + e.target.id.substring(1);

		// attribute regex and msg alongside id
		if (e.target.id === 'mail') {
			regex = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');
			msg = messages.errors.mail;
		} else if (e.target.id === 'passwd') {
			regex = new RegExp('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}|)$');
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
		const {messages} = this.context;
		if (!this.state.errPasswd && !this.state.errMail &&
			!this.state.errLogin && !this.state.errFirstname &&
			!this.state.errName && !this.state.errLang) {
			var data = {
				name: this.state.name,
				firstname: this.state.firstname,
				password: this.state.passwd,
				email: this.state.mail,
				lang: this.context.lang
			};

			var formData = new FormData();

			for (var name in data) {
				formData.append(name, data[name]);
			}
			formData.append('path_img', this.state.img);
			fetch('/api/user/me', {
				method: 'PUT',
				body: formData,
				headers: {
					Authorization: 'Bearer ' + this.props.token
				}
			})
			.then(res => res.json())
			.then(res => {
				if (res.statusCode === 200) {
		  			this.setState({open: true, modalRep:messages.success, 
					modalMsg:messages.profile.success
					});
				} else { //rep serveur : res.data === array only
					if (!res.hasOwnProperty('data'))
					{
							this.setState({
								open: true, modalRep:'Image is too heavy',
								modalMsg:messages.profile.image
							});
						return ;
					}
					res.data.forEach(msg => {
						if (msg.path === 'pseudo')
							{this.setState({errLogin: msg.message});}
						if (msg.path === 'email')
							{this.setState({errMail: msg.message});}
						if (msg.path === 'password')
							{this.setState({errPasswd: msg.message});}
						if (msg.path === 'name')
							{this.setState({errName: msg.message});}
						if (msg.path === 'firstname')
							{this.setState({errFirstname: msg.message});}
						if (msg.path === 'image') {
							this.setState({
								open: true, modalRep:messages.error,
								modalMsg:messages.profile.image
							});
						}
					});
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
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = this.attachFile;
			reader.readAsDataURL(event.target.files[0]);
			this.setState({img: event.target.files[0]});
		}
	}
	render() {
		const classImg = 'VisitorMarge VisitorImg';
		const {messages} = this.context;
		const actions = [
			      <FlatButton
				label="OK"
				primary
				onTouchTap={this.handleClose}
				/>
			    ];
		return (
			<Center
				>
				<Dialog
					title={this.state.modalRep}
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					>
					{this.state.modalMsg}
				</Dialog>
				<Paper zDepth={2}
						className="background"
				>
					<AppBar
						showMenuIconButton={false}
						title={messages.profile.update}
						/>
					<input
						style={this.state.provider === "hypertube" ? {display:"inline"} : {display:"none"}}
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
						disabled={true}
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
						hintText={messages.profile.passwd}
						floatingLabelText={messages.profile.passwd}
						style={this.state.provider === "hypertube" ? {display:"block"} : {display:"none"}}
						type="password"
						errorText={this.state.errPasswd}
						onKeyDown={this.handleKey}
						/>
					<br/>
					<Center>
						<RaisedButton
							label={messages.profile.update}
							className="VisitorMarge"
							disabled={(this.state.errLogin
								|| this.state.errName
								|| this.state.errFirstname
								|| this.state.errMail
								|| this.state.errPasswd) ? true : false}
							onClick={this.ajaxCall}
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
