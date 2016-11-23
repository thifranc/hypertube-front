import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
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
			errLogin: false
		};
	}
	handleLogin(e) {
		this.setState({errLogin: true});
		this.setState({login: e.target.value});
	}
	render() {
		return (
			<Center style={style}>
				<Paper zDepth={2}>
				<AppBar
				showMenuIconButton={false}
			    title="Login"
			  />
				<Toolbar>
					<ToolbarTitle text="Login"/>
				</Toolbar>
					<TextField style={marge}
						value={this.state.login}
						onChange={this.handleLogin.bind(this)}	
						floatingLabelText="Login"
						hintText="Your login"
						errorText={this.state.errLogin && "This field is required"}
						/>
					<br/>
					<TextField style={marge}
						hintText="Password Field"
						floatingLabelText="Password"
						type="password"
						/>
					<br/>
				    <RaisedButton label="Log In" style={marge} />
				</Paper>
			</Center>
		);
	}
}

export default Login;
