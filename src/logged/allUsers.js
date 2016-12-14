import '../util/styles.css';
import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router';
import 'whatwg-fetch';

class allUsers extends Component {
	constructor() {
		super();
		this.state = {
			users: {},
			column: 6
		};
		this.columnWatch = this.columnWatch.bind(this);
		window.addEventListener('resize', this.columnWatch, false);
	}
	columnWatch() {
		const width = window.innerWidth;

		if (width > 1300) {
			this.setState({column: 6});
		} else if (width > 1000 && width < 1300) {
			this.setState({column: 5});
		} else if (width > 800 && width < 1000) {
			this.setState({column: 3});
		} else if (width < 600) {
			this.setState({column: 1});
		}
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
	componentWillUnmount() {
		window.removeEventListener('resize', this.columnWatch, false);
	}

	render() {
		const users = this.state.users;
		const {messages} = this.context;




		return (
			<div className='background'>
				<GridList cellHeight={'auto'} cols={this.state.column}>
					{ this.state.users.length > 0 ?
				this.state.users.map((user, i) => (
					<Link key={i} to={'/user/' + user.id}>
						<GridTile
							title={messages.login + ': ' + user.pseudo}
							subtitle={messages.firstname + ': ' + user.firstname}
							>
							<img
								style={{width: '100%', height:'100%', maxWidth:'500px', maxHeight:'500px'}}
								src = {(user.provider !== 'hypertube') ?
							user.path_img :
							(user.path_img === null) ?
								'http://localhost:4242/picture/default.jpg' : '/picture/' + user.path_img }
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

allUsers.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func,
	router: React.PropTypes.object
};

export default allUsers;
