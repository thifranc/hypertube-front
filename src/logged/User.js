import '../util/styles.css';
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import Date from 'material-ui/svg-icons/action/date-range';
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
		maxWidth:'800px',
		maxHeight:'800px',
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
			movies: [],
			column: 6
		};
		this.movies = [];
		this.columnWatch = this.columnWatch.bind(this);
		window.addEventListener('resize', this.columnWatch, false);
	}

	columnWatch() {
		const width = window.innerWidth;

		if (width > 1300 && this.movies.length > 6) {
			this.setState({column: 6});
		} else if (width > 1000 && this.movies.length > 5) {
			this.setState({column: 5});
		} else if ((width > 800 && this.movies.length > 3)) {
			this.setState({column: 3});
		} else if (width < 600) {
			this.setState({column: 1});
		} else {
			this.setState({column: this.movies.length});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.columnWatch, false);
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
			if (res.status !== 200)
				{return Promise.reject('Bad user');}
			return res.json();
		})
		.then(res => {
			user = res.data;

			let path;
			(res.data.provider !== 'hypertube') ?
				path = res.data.path_img :
				(res.data.path_img === null) ?
					path = 'http://localhost:4242/picture/default.jpg' : path = '/picture/' + res.data.path_img;
			user.path_img = path;

			// user.path_img = res.data.path_img ? '/picture/'+res.data.path_img : 'http://localhost:4242/picture/default.jpg';
			var countFetch = 0;
			let len = user.movie_view.length;
			if (len === 0) {
				this.setState({user: user});
				return;
			}
			this.movies = new Array(len).fill(len);

			for (let i = 0; i < len; i++) {
				fetch('/api/yts/movie_details.json?movie_id=' + user.movie_view[i].id_movies + '&with_images=true', {
					method: 'GET',
					headers: {'Content-Type': 'application/json'}
				})
				.then(res => {
					countFetch++;
					return res.json();
				})
				.then(res => {
					this.movies.splice(i, 1, res.data.movie);
					if (countFetch >= len) {
						this.columnWatch();
						this.setState({user: user});
					}
				})
				.catch(err => {
					console.log('Err fetch details movie => ', err);
				});
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

		return (
			<div className='root background'>
				{!Object.keys(user).length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<div style={styles.root}>
						<AppBar
							style={{textAlign: 'center'}}
							showMenuIconButton={false}
							title={messages.user.user}
							/>
						<div className="center" style={{display:'flex', flex:1, flexDirection:"row", justifyContent:"center"}}>
							<div style={{flex:2}}>
								<img style={styles.img} src={user.path_img} alt="user"/>
							</div>
							<div style={{flex:1, textAlign:"left"}}>
								<List style={styles.inline}>
									<ListItem primaryText={messages.login} secondaryText={user.pseudo}/>
									<ListItem primaryText={messages.name} secondaryText={user.name}/>
									<ListItem primaryText={messages.firstname} secondaryText={user.firstname}/>
								</List>
							</div>
						</div>
					</div>
				}
				{ movies.length > 0 ?
					<div style={styles.root}>
						<AppBar
							showMenuIconButton={false}
							title={messages.user.lastSeen}
							style={{textAlign: 'center'}}
							/>
						<GridList style={{margin: 0}} cellHeight={'auto'} cols={this.state.column}>
							{ movies.map((movie, index) => (
								<Link key={index} to={'/movie/' + movie.id}>
									<GridTile
										style={movie.view}
										title={movie.title}
										subtitle={movie.year}
										actionIcon={<IconButton tooltip={movie.rating} touch={Boolean(true)} tooltipPosition="top-center"><StarBorder color="yellow"/></IconButton>}
										actionPosition="right"
										>
										<img style={{width: '100%'}} src={movie.large_cover_image} alt="cover"/>
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
