import React, {Component} from 'react';
// import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

import Center from '../util/Center';
import './visitor.css';

class Forget extends Component {
	constructor() {
		super();
		this.state = {
			hidden: true,
			login: '',
			errLogin: false,
			mail: '',
			errMail: false
		};
		this.handleSwap = this.handleSwap.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleMail = this.handleMail.bind(this);
		this.fillChar = this.fillChar.bind(this);
	}
	handleLogin(e) {
		let regLowercase = new RegExp('^[a-z]*$');

		if (regLowercase.test(e.target.value) === false) {
			this.setState({errLogin: true});
		} else {
			this.setState({errLogin: false});
		}
		this.setState({login: e.target.value});
	}
	handleMail(e) {
		let regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');

		if (regMail.test(e.target.value) === false) {
			this.setState({errMail: true});
		} else {
			this.setState({errMail: false});
		}
	}
	fillChar(e) {
		this.setState({mail: e.target.value});
	}
	handleSwap() {
		this.setState(prevState => {
			return {hidden: !prevState.hidden};
		});
		this.setState({errLogin: false});
		this.setState({errMail: false});
	}
	render() {
		const {messages} = this.context;
		return (
			<Center className="VisitorHeight">
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title="Forgot password"
						/>
					<RaisedButton
						label="Change"
						className="VisitorMarge"
						onClick={this.handleSwap}
						/>
					{this.state.hidden ?
						<TextField
							className={this.state.hidden ? 'VisitorHidden' : 'VisitorMarge'}
							value={this.state.login}
							id="login"
							onChange={this.handleLogin}
							hintText="Your login"
							floatingLabelText="Login"
							errorText={this.state.errLogin && 'Login is only lowercase characters'}
							/> :
							<TextField
								className={this.state.hidden ? 'VisitorMarge' : 'VisitorHidden'}
								value={this.state.mail}
								id="mail"
								onChange={this.fillChar}
								hintText="Your mail"
								floatingLabelText="Mail"
								errorText={this.state.errMail && 'Mail is not correct'}
								/>
					}
					<br/>
					<RaisedButton
						label="Mail me"
						className="VisitorCentered"
						disabled={this.state.errLogin}
						onClick={this.handleMail}
						/>
					<Link to="/login" className="VisitorMarge">Home</Link>
				</Paper>
			</Center>
		);
	}
}

Forget.contextTypes = {
	messages: React.PropTypes.object
};

export default Forget;
