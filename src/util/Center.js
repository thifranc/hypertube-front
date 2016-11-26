import React, {Component} from 'react';
import './Center.css';

class Center extends Component {
	render() {
		return (
			<div className={this.props.className + ' Center'} >
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Center;
