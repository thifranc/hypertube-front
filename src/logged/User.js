import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Date from 'material-ui/svg-icons/action/date-range';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

import Center from '../util/Center';

import 'whatwg-fetch';
import './User.css';

const styles = {
	loader: {
		height: 'calc(100vh - 56px)'
	},
	img: {
		height: '20%',
		width: '20%',
		display: 'inline-block'
	},
	inline: {
		display: 'inline-block'
	}
};

class User extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			movie: {}
		};
	}
	componentDidMount() {
		var id = this.props.params.id;
		fetch('/api/user/' + id, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				if (typeof (res) !== 'undefined') {
					if (!res.data.path_img)
						res.data.path_img = "default.jpg";
					this.setState({user: res.data});
				}
			})
			.then(() => {
				if (this.state.user.lastSeen) {
					return (
						fetch('/api/v2/movie_details.json?movie_id=' + this.state.user.lastSeen + '&with_images=true', {
							method: 'GET',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json'
							}
						})
					);
				} else {
					return null;
				}
			})
			.then(res => res.json())
			.then(res => {
				this.setState({movie: res.data.movie});
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		const {messages} = this.context;
		const user = this.state.user;
		const movie = this.state.movie;
		return (
			<div>
				<Paper zDepth={1}>
					{!Object.keys(user).length ?
						<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
						<Center>
							<AppBar
								showMenuIconButton={false}
								title={messages.user.user}
								/>
							<div className="center">
								<img style={styles.img} src={user.img}/>
								<List style={styles.inline}>
									<ListItem primaryText={user.pseudo}/>
									<ListItem primaryText={user.name}/>
									<ListItem primaryText={user.firstname}/>
									<ListItem primaryText={user.email}/>
								</List>
							</div>
						</Center>
				}
				</Paper>
				<Paper zDepth={1}>
					{!Object.keys(movie).length ?
						<Center><p> No movie seen yet, recommand him one ! </p></Center> :
						<Center>
							<div className="closeDiv center">
								<AppBar
									showMenuIconButton={false}
									title={messages.user.lastSeen}
									/>
								<img className="imgDiv" src={movie.large_cover_image}/>
								<h1>{movie.title}</h1>
								<List style={{display: 'inline-block'}}>
									<ListItem primaryText={movie.rating} leftIcon={<ActionGrade/>}/>
									<ListItem primaryText={movie.year} leftIcon={<Date/>}/>
								</List>
								<p>{movie.description_full}</p>
							</div>
						</Center>
				}
				</Paper>
			</div>
		);
	}
}

User.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func,
	router: React.PropTypes.object
};

export default User;
