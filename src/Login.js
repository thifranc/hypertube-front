import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';



class Login extends Component {
	render() {
		return (
			<div>
				<TextField
				  floatingLabelText="Login"
				/><br />
				<br />
				<TextField
				  hintText="Password Field"
				  floatingLabelText="Password"
				  type="password"
				/><br />
			  </div>
		);
	}
}

export default Login;
