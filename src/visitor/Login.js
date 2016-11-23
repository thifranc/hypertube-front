import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import Center from '../util/Center';

const style = {
	height: '100vh'
};

class Login extends Component {
	render() {
		return (
			<Center style={style}>
				<TextField
					floatingLabelText="Login"
					/><br/>
				<br/>
				<TextField
					hintText="Password Field"
					floatingLabelText="Password"
					type="password"
					/><br/>
			</Center>
		);
	}
}

export default Login;
