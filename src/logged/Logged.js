import React, {Component} from 'react';
import Nav from './Nav';

import './Logged.css';

class Logged extends Component {
	render() {
		return (
			<div className="LoggedBlock">
				<Nav/>
				{this.props.children}
			</div>
		);
	}
}

export default Logged;
