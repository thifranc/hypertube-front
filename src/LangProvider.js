import React, {Component} from 'react';
import lang from './lang';

/* check browser lang / AJAX call api */
class LangProvider extends Component {
	constructor() {
		super();
		this.state = {
			lang: 'en'
		};
		this.handleLangChange = this.handleLangChange.bind(this);
	}
	handleLangChange(lang) {
		this.setState({lang: lang});
	}
	getChildContext() {
		return {
			lang: this.state.lang,
			messages: lang[this.state.lang],
			langChange: this.handleLangChange
		};
	}
	render() {
		return this.props.children;
	}
}

LangProvider.propTypes = {
	children: React.PropTypes.node
};

LangProvider.childContextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func
};

export default LangProvider;
