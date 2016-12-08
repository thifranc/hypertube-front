import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Date from 'material-ui/svg-icons/action/date-range';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

import Center from '../util/Center';

import 'whatwg-fetch';
import './User.css';


import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star';


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
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	}
};

class User extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			movie: {},
			column : 6
		};
		this.movies = [];
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
		let user = null;
		var id = this.props.params.id;

		fetch('/api/user/' + id, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		})
		.then(res => {
			if (res.status != 200)
				return Promise.reject('Bad user');
			return res.json();
		})
		.then(res => {
			user = res.data;
			if (!res.data.path_img)
				user.path_img = "http://localhost:4242/picture/default.jpg";
			var countFetch = 0;
			let len = user.movie_view.length;

			// let fetchAll = [];
			// for (let i = 0; i < len; i++) {
			// 	fetchAll.push(
			// 		fetch('/api/yts/movie_details.json?movie_id=' + user.movie_view[i]['id_movies'] + '&with_images=true', {
			// 			method : 'GET',
			// 			headers : { 'Content-Type': 'application/json'}
			// 		})
			// 	);
			// }
			// Promise.all(fetchAll.map(p => p.catch(e => e)))
			// .then(response => {
			// 	console.log('Response => ', response);
			// 	for (let i = 0; i < len; i++) {
			// 		response[i].json()
			// 		.then(response => {
			// 			console.log('response final => ', response)
			// 		})
			// 	}
			// })
			// .then((response) => {
			// 	console.log('Response final => ', response);
			// })
			// .catch((error) => {
			// 	console.log('Error => ', error);
			// })



			for (let i = 0; i < len; i++) {
				fetch('/api/yts/movie_details.json?movie_id=' + user.movie_view[i]['id_movies'] + '&with_images=true', {
					method : 'GET',
					headers : { 'Content-Type': 'application/json'}
				})
				.then(res => {
					countFetch++;
					return res.json();
				})
				.then((res) => {
					this.movies.push(res.data.movie);
					if (countFetch >= len) {
						this.setState({user : user});
						this.columnWatch();
					}
				})
				.catch((err) => {
					console.log('Err fetch details movie => ', err);
				})
			}
		})
		.catch(err => {
			console.log(err);
			browserHistory.push('/');				
		});
	}

	render() {
		const {messages} = this.context;
		const user = this.state.user;
		const movies = this.movies;
		// console.log('RES FINAL ===>', this.movies, this.movies.length);

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
					{/*!Object.keys(movie).length ?
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
					*/}
				</Paper>



				{ movies.length > 0 ?
					<div style={styles.root}>
						<GridList  cols={this.state.column}>
							{ movies.map(movie => (
									<Link key={movie.id} to={'/movie/' + movie.id}>
										<GridTile
											style={movie.view}
											title={movie.title}
											subtitle={movie.year}
											actionIcon={<IconButton tooltip={movie.rating} touch={Boolean(true)} tooltipPosition="top-center"><StarBorder color="yellow"/></IconButton>}
											actionPosition="right"
										>
											<img style={{width: '100%'}} src={movie.large_cover_image} />
										</GridTile>
									</Link>
								))
							}
						</GridList>
					</div>
					:
					<Center><p> No movie seen yet, recommand him one ! </p></Center>
				}

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
