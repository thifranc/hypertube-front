import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Center from '../util/Center';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Date from 'material-ui/svg-icons/action/date-range';

import 'whatwg-fetch';
import './Movie.css';

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

var	defaultProfile = {
	img: 'http://www.filecluster.com/howto/wp-content/uploads/2014/07/User-Default.jpg',
	login: 'login',
	name: 'name',
	firstname: 'firstname',
	mail: 'mail',
	lastSeen: 6198
};

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			profile: defaultProfile,
			movie: {}
		};
	}
	componentDidMount() {
		fetch('/user', {
			method: 'GET'
		})
			.then(res => {
				res.json();
			})
			.then(res => {
				if (typeof (res) !== 'undefined')
					{this.setState({profile: res.data});}
			})
			.then(() => {
				if (this.state.profile.lastSeen)
				{
					return (
						fetch('/api/v2/movie_details.json?movie_id=' + this.state.profile.lastSeen + '&with_images=true', {
							method: 'GET',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json'
							}
						})
					);
				}
				else
					{return null;}
			})
			.then(res => res.json())
			.then(res => {
				this.setState({movie: res.data.movie});
			})
			.catch(err => console.log(err));
	}
	render() {
		const profile = this.state.profile;
		const movie = this.state.movie;
		return (
			<div>
				{!Object.keys(profile).length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<Center>
						<div className="center">
							<img style={styles.img} src={profile.img}/>
							<List style={styles.inline}>
								<ListItem primaryText={profile.login}/>
								<ListItem primaryText={profile.name}/>
								<ListItem primaryText={profile.firstname}/>
								<ListItem primaryText={profile.mail}/>
							</List>
						</div>
					</Center>
				}
				{!Object.keys(movie).length ?
					<p> No movie seen yet, recommand him one ! </p> :
					<Center>
						<div className="closeDiv center">
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
			</div>
		);
	}
}

export default Profile;
