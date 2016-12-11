import React, {Component} from 'react';
import Nav from './Nav';

import './Logged.css';

class Logged extends Component {
	constructor() {
		super();
		this.state = {
			token: localStorage.getItem('token')
		};
	}

	render() {
		return (
			<div className="LoggedBlock">
				<Nav path={this.props.location.pathname}/>
				{React.cloneElement(this.props.children, {token: this.state.token})}
			</div>
		);
	}
}

export default Logged;
