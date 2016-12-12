import React, {Component} from 'react';
// import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Link} from 'react-router';
import Visibility from 'material-ui/svg-icons/action/visibility';
import {red800} from 'material-ui/styles/colors';

import Center from '../util/Center';
import MultiLang from './MultiLang';
import './visitor.css';

class Reset extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
			modalRep:'',
			modalMsg:'',
			newPasswd: '',
			showPasswd: false,
			errNewPasswd: false
		};
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handlePasswd = this.handlePasswd.bind(this);
		this.handleEye = this.handleEye.bind(this);
		this.handleKey = this.handleKey.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	handleClose() {
		  this.setState({open: false});
	}
	handleKey(e) {
		if (e.key === 'Enter')
			{this.handlePasswd();}
	}
	handleFillChar(e) {
		this.setState({newPasswd: e.target.value});
	}
	ajaxCall() {
		const {messages} = this.context;
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
				.then(res => {
					if (res.statusCode === 200) {
						this.setState({open: true, modalRep:messages.success, 
						modalMsg:messages.reset.success
						});
					} else {
						this.setState({
							open: true, modalRep:messages.error,
							modalMsg:messages.reset.fail
						});
					}
				})
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
		const {messages} = this.context;
		const actions = [
			      <FlatButton
				label="OK"
				primary
				onTouchTap={this.handleClose}
				/>
			    ];
		return (
			<Center className="VisitorHeight">
				<Dialog
					title={this.state.modalRep}
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					>
					{this.state.modalMsg}
				</Dialog>
				<Paper zDepth={2}>
					<AppBar
						showMenuIconButton={false}
						title="Reset password"
						iconElementRight={<MultiLang/>}
						/>
					<TextField
						className={'VisitorMarge'}
						value={this.state.newPasswd}
						onChange={this.handleFillChar}
						hintText="New password"
						type={this.state.showPasswd ? 'text' : 'password'}
						floatingLabelText="New password"
						errorText={this.state.errNewPasswd && messages.errors.passwd}
						onKeyDown={this.handleKey}
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

Reset.contextTypes = MultiLang.contextTypes;

export default Reset;
