import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router';

import Center from '../util/Center';

import 'whatwg-fetch';

const styles = {
	loader: {
		height: 'calc(100vh - 56px)'
	}
};

class allUsers extends Component {
	constructor() {
		super();
		this.state = {
			users: {}
		};
	}
	componentDidMount() {
		fetch('/api/user', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.props.token
			}
		})
		.then(res => res.json())
		.then(res => {
			console.log(res);
			this.setState({users: res.data});
		})
		.catch(err => console.log(err));

	}
	render() {
		const users = this.state.users;

		return (
			<div>
			<GridList cellHeight={'auto'} cols={3}>
			{ this.state.users.length > 0 ?
				this.state.users.map((user, i) => (
					<Link key={i} to={'/user/' + user.id}>
						<GridTile
							title={user.pseudo}
							subtitle={user.firstname}
							>
							<img
								style={{width: '100%'}}
								src={user.path_img ? user.path_img : "default.jpg"}
								alt="user"
								/>
						</GridTile>
					</Link>
				))
				: <p>No users...</p>
			}
			</GridList>
			</div>
		);
	}
}

export default allUsers;
