import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

class Filter extends Component {
	getMenuItems(obj) {
		let items = [];

		for (let index in obj)
			items.push(<MenuItem key={index} value={index} primaryText={obj[index]} />);
		return items;
	}

	render () {
		const {messages} = this.context;
		return (
			<div>
				<SelectField id="sortBy" style={{verticalAlign: 'bottom'}} floatingLabelText={messages.search.sortBy} value={this.props.sortBy} onChange={this.props.handleSort}>
					{ this.getMenuItems(messages.sortBy) }
				</SelectField>
				<SelectField id="genre" style={{verticalAlign: 'bottom', marginLeft: '20px'}} floatingLabelText={messages.search.genre} value={this.props.genre} onChange={this.props.handleGenre} >
					<MenuItem value='all' primaryText="" />
					{ this.getMenuItems(messages.genre) }
				</SelectField>
				<TextField
					id="search"
					style={{marginLeft: '20px'}}
					onBlur={this.props.handleSearch}
					onKeyDown={this.props.handleKey}
					hintText={messages.search.search}
					floatingLabelText={messages.search.search}
				/>
				<div id="slider">
					<div className='slider'>
						<span>{messages.search.rate}</span>
						<Slider
							range={true}
							min={0}
							max={10}
							style={{border:'1px solid black'}}
							onChange={this.props.handleRate}
							onAfterChange={this.props.handleRange}
							defaultValue={[this.props.rate.min, this.props.rate.max]}
						/>
					</div>
					<div className='slider spaceSliders'>
						<span>{messages.search.year}</span>
						<Slider
							range={true}
							min={1970}
							max={new Date().getFullYear()}
							onChange={this.props.handleYears}
							onAfterChange={this.props.handleRange}
							defaultValue={[this.props.years.min, this.props.years.max]}
						/>
					</div>
				</div>
			</div>
		);
	}
}

Filter.contextTypes = {
	messages: React.PropTypes.object
};

export default Filter;
