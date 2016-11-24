import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


import Center from '../util/Center';

const style = {
	height: '100vh'
};

const marge = {
	  marginLeft: 20,
	  marginRight: 20,
	  marginTop: 10,
	  marginBottom: 10,
};

class Login extends Component {
	constructor() {
		super();
		this.state = {
			login: '',
			errLogin: false,
			firstname: '',
			errFirstname: false,
			name: '',
			errName: false,
			mail: '',
			errMail: false,
			passwd: '',
			errPasswd: false
		};
	}
	handleLowercase(e) {
		var regLowercase = new RegExp('^[a-z]*$');
		var err = 'err' + e.target.id.charAt(0).toUpperCase() + e.target.id.substring(1);

		if (!regLowercase.test(e.target.value))
			this.setState({[err]: true});
		else
			this.setState({[err]: false});
		this.fillChar(e);
	}
	validForm(e) {
		var regPasswd = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$');
		var regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');

		if (!regPasswd.test(document.getElementById('passwd').value))
			this.setState({errPasswd: true});
		else
			this.setState({errPasswd: false});

		if (!regMail.test(document.getElementById('mail').value))
			this.setState({errMail: true});
		else
			this.setState({errMail: false});
	}
	fillChar(e) {
		this.setState({[e.target.id.toLowerCase()]: e.target.value});
	}
	render() {
		return (
			<Center style={style}>
				<Paper zDepth={2}>
				<AppBar
				showMenuIconButton={false}
			    title='Register'
			  />
					<TextField style={marge}
						value={this.state.login}
						id='Login'
						onChange={this.handleLowercase.bind(this)}	
						floatingLabelText='Login'
						hintText='Your login'
						errorText={this.state.errLogin && 'Login is only lowercase characters'}
						/>
					<br/>
					<TextField style={marge}
						value={this.state.firstname}
						onChange={this.handleLowercase.bind(this)}	
						id='Firstname'
						floatingLabelText='Firstname'
						hintText='Firstname'
						errorText={this.state.errFirstname && 'Firstname is only lowercase characters'}
						/>
					<br/>
					<TextField style={marge}
						value={this.state.name}
						id='Name'
						onChange={this.handleLowercase.bind(this)}	
						floatingLabelText='Name'
						hintText='Name'
						errorText={this.state.errName && 'Name is only lowercase characters'}
						/>
					<br/>
					<TextField style={marge}
						value={this.state.mail}
						id='mail'
						onChange={this.fillChar.bind(this)}	
						hintText='Mail'
						floatingLabelText='Mail'
						errorText={this.state.errMail && 'Mail is not correct'}
						/>
					<br/>
					<TextField style={marge}
						value={this.state.passwd}
						id='passwd'
						onChange={this.fillChar.bind(this)}	
						hintText='Password Field'
						floatingLabelText='Password'
						type='password'
						errorText={this.state.errPasswd && 'Password must have one upper, lower, and digit, and be at least 8 char long'}
						/>
					<br/>
				    <RaisedButton
						label='Log In'
						id='validateButton'
						style={marge}
						disabled={this.state.errLogin || this.state.errName || this.state.errFirstname}
						onClick={this.validForm.bind(this)}
						/>
				</Paper>
			</Center>
		);
	}
}

export default Login;
