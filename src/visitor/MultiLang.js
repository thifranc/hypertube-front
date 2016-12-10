import React, {Component} from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class MultiLang extends Component {
	constructor() {
		super();
		this.handleSelectLang = this.handleSelectLang.bind(this);
	}
	handleSelectLang(event, index, value) {
		this.context.langChange(value);
	}
	render() {
		const {messages, lang} = this.context;
		return (
			<div style={{flex: 'none', marginLeft: '15px'}}>
				<SelectField value={lang} onChange={this.handleSelectLang} style={{width: '150px', marginRight: '20px'}}>
					<MenuItem value={'en'} primaryText="English"/>
					<MenuItem value={'fr'} primaryText="Français"/>
					<MenuItem value={'es'} primaryText="Castellano"/>
				</SelectField>
			</div>
		);
	}
}

MultiLang.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func,
	router: React.PropTypes.object
};

export default MultiLang;
