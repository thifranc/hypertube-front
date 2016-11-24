import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Nav extends Component {
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
			<div>
				<div>{messages.login}</div>
				<SelectField value={lang} onChange={this.handleSelectLang} autoWidth>
					<MenuItem value={'en'} primaryText="English"/>
					<MenuItem value={'fr'} primaryText="Français"/>
					<MenuItem value={'es'} primaryText="Castellano"/>
				</SelectField>
			</div>
		);
	}
}

Nav.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func
};

export default Nav;
