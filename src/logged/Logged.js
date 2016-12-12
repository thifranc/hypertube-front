import React, {Component} from 'react';
import Nav from './Nav';

import Footer from './Footer';
import { StickyContainer, Sticky } from 'react-sticky';

class Logged extends Component {
	constructor() {
		super();
		this.state = {
			token: localStorage.getItem('token')
		};
	}

	render() {
		return (
			<div>
				<div style={{zIndex:"9999", width:"100%", position:"fixed", top:"0"}}>
					<Nav path={this.props.location.pathname}/>
				</div>
				{React.cloneElement(this.props.children, {token: this.state.token})}
				<div style={{zIndex:"10", width:"100%", position:"fixed", bottom:"0"}}>
					<Footer/>
				</div>
			</div>
		);
	}
}

export default Logged;
