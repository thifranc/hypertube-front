import React, {Component} from 'react';
import Nav from './Nav';

import Footer from '../Footer';
import './Logged.css';
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
			<div className="LoggedBlock">
				<StickyContainer>
				<Sticky>
				<Nav path={this.props.location.pathname}/>
				</Sticky>
				{React.cloneElement(this.props.children, {token: this.state.token})}
			<div style={{zIndex:"10", width:"100%", position:"fixed", bottom:"0"}}>
				<Footer/>
			</div>
				</StickyContainer>
			</div>
		);
	}
}

export default Logged;
