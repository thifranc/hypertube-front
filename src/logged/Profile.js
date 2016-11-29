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
		display:'inline-block'
	},
	inline: {
		display:'inline-block'
	}
};

var	defaultProfile = {
	img : "http://www.filecluster.com/howto/wp-content/uploads/2014/07/User-Default.jpg",
	login : "login",
	name : "name",
	firstname : "firstname",
	mail : "mail",
	lastSeen : 6198
}

const ListExampleSimple = () => (
	  <MobileTearSheet>
		    <List>
		      <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
		      <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
		      <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
		      <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
		    </List>
		    <Divider />
		    <List>
		      <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
		      <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
		      <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
		      <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
		    </List>
		  </MobileTearSheet>
);


class Profile extends Component {
	constructor() {
		super();
		this.state = {
			profile: defaultProfile,
			movie: {}
		};
	}
	componentDidMount() {
		fetch('/profile', {
			method: 'GET',
		})
			.then(res => {
				res.json();
				console.log('CATCHE');
			})
			.then(res => {
				if (typeof(res) === 'undefined')
				{
					console.log(res);
				}
				else
					this.setState({profile: res.data});
			})
			.then(() => {
				if (this.state.profile.lastSeen)
				{
					console.log('LAST MOVIE SEENkj === ', this.state.profile.lastSeen);
					return  (
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
					return null;
			})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState({movie: res.data.movie});
			})
			.then(() => console.log(this.state.movie))
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
				<List style={{display: 'inline-block'}}>
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
								<ListItem primaryText={movie.rating} leftIcon={<ActionGrade />} />
								<ListItem primaryText={movie.year} leftIcon={<Date />} />
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
