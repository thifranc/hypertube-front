import React, {Component} from 'react';

import {List, ListItem} from 'material-ui/List';
import Center from '../util/Center';

const styles = {
	img: {
		height: '20%',
		width: '20%',
		display:'inline-block'
	},
	inline: {
		display:'inline-block'
	}
};

class Profile extends Component {
	constructor(){
		super();
		this.img = 'http://www.filecluster.com/howto/wp-content/uploads/2014/07/User-Default.jpg';
		this.name = 'default';
		this.firstname = 'default';
		this.login = 'default';
		this.mail = 'default@gmail.com';
	}
	render() {
		return (
			<Center>
				<img style={styles.img} src={this.img}/>
				<List style={{display: 'inline-block'}}>
				  <ListItem primaryText={this.login}/>
				  <ListItem primaryText={this.name}/>
				  <ListItem primaryText={this.firstname}/>
				  <ListItem primaryText={this.mail}/>
				</List>
			</Center>
		);
	}
}

export default Profile;
