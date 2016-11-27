import React, {Component} from 'react';
import './Center.css';

class Center extends Component {
	render() {
		return (
			<div style={this.props.style} className={this.props.className + ' Center'} >
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Center;
