import React, {Component} from 'react';
// import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import Visibility from 'material-ui/svg-icons/action/visibility';
import {red800} from 'material-ui/styles/colors';

import Center from '../util/Center';
import './visitor.css';

class Reset extends Component {
	constructor() {
		super();
		this.state = {
			newPasswd: '',
			showPasswd: false,
			errNewPasswd: false
		};
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handlePasswd = this.handlePasswd.bind(this);
		this.handleEye = this.handleEye.bind(this);
		console.log(this);
	}
	handleFillChar(e) {
		this.setState({newPasswd: e.target.value});
	}
	ajaxCall() {
		if (!this.state.errNewPasswd) {
			var data = JSON.stringify({
				id: this.props.params.id,
				token: this.props.params.token,
				password: this.state.newPasswd
			});
			fetch('/api/user/reset', {
				method: 'PATCH',
				body: data
			})
				.then(res => res.json())
				.then(res => console.log(res))
				.catch(err => console.log(err));
		}
	}
	handlePasswd() {
		var regPasswd = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$');
		this.setState(
			{errNewPasswd: !regPasswd.test(this.state.newPasswd)},
			this.ajaxCall);
	}
	handleEye() {
		this.setState(prevState => {
			return {showPasswd: !prevState.showPasswd};
		});
	}
	render() {
		const {messages, lang} = this.context;
		return (
			<Center className="VisitorHeight">
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title="Reset password"
						/>
					<TextField
						className={'VisitorMarge'}
						value={this.state.newPasswd}
						onChange={this.handleFillChar}
						hintText="New password"
						type={this.state.showPasswd ? 'text' : 'password'}
						floatingLabelText="New password"
						errorText={this.state.errNewPasswd && messages.errors.passwd}
						/>
					<Visibility
						hoverColor={red800}
						className={'VisitorMarge'}
						onClick={this.handleEye}
						/>
					<br/>
					<Center>
						<RaisedButton
							label="Reset"
							className="VisitorCentered"
							onClick={this.handlePasswd}
							/>
						<Link to="/login" className="VisitorMarge">Home</Link>
					</Center>
				</Paper>
			</Center>
		);
	}
}

Reset.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func,
	router: React.PropTypes.object
};

export default Reset;
