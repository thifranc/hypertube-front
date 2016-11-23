import React, {Component} from 'react';
import './Center.css';

class Center extends Component {
	render() {
		return (
			<div className="Center" style={this.props.style}>
				<div>
					{this.props.children}
				</div>
			</div>
    );
	}
}

export default Center;
