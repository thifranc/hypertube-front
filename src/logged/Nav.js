import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const account = <FontIcon className="material-icons">account_circle</FontIcon>;
const search = <FontIcon className="material-icons">search</FontIcon>;
const exit = <FontIcon className="material-icons">exit_to_app</FontIcon>;
const people = <FontIcon className="material-icons">people</FontIcon>;

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 1
		};

		this.path = this.props.path;

		this.handleSelectNav = this.handleSelectNav.bind(this);
		this.handleSelectLang = this.handleSelectLang.bind(this);
		this.selectPathFromName = this.selectPathFromName.bind(this);
	}
	componentDidMount() {
		const pathname = this.context.router.getCurrentLocation().pathname;

		if (pathname === '/') {
			this.setState({selectedIndex: 1});
		} else if (pathname === '/profile') {
			this.setState({selectedIndex: 2});
		}
	}
	componentWillUpdate(nextProps, nextState) {
		this.path = nextProps.path
	}

	handleSelectLang(event, index, value) {
		this.context.langChange(value);
	}
	handleSelectNav(index) {
		this.setState({selectedIndex: index});
		if (index === 1) {
			browserHistory.push('/');
		} else if (index === 2) {
			browserHistory.push('/allUsers');
		} else if (index === 3) {
			browserHistory.push('/profile');
		} else if (index === 4) {
			localStorage.clear();
			browserHistory.push('/login');
		}
	}

	selectPathFromName () {
		if (this.path === '/')
			return 1;
		else if (this.path === '/allUsers'
      || this.path.search('^/user/') !== -1)
			return 2;
		else if (this.path === '/profile')
			return 3;
		else if (this.path === '/login')
			return 4;
	}

	render() {
		const {messages, lang} = this.context;
		const page = this.selectPathFromName();
		
		return (
			<div>
				<Paper zDepth={1}>
					<BottomNavigation selectedIndex={page}>
						<div/>
						<BottomNavigationItem label={messages.nav.search} icon={search} onTouchTap={() => this.handleSelectNav(1)}/>
						<BottomNavigationItem label={messages.user.user} icon={people} onTouchTap={() => this.handleSelectNav(2)}/>
						<BottomNavigationItem label={messages.nav.profil} icon={account} onTouchTap={() => this.handleSelectNav(3)}/>
						<BottomNavigationItem label={messages.nav.logout} icon={exit} onTouchTap={() => this.handleSelectNav(4)}/>
						<div/>
						<div style={{flex: 'none'}}>
							<SelectField value={lang} onChange={this.handleSelectLang} style={{width: '150px', marginRight: '20px'}}>
								<MenuItem value={'en'} primaryText="English"/>
								<MenuItem value={'fr'} primaryText="Français"/>
								<MenuItem value={'es'} primaryText="Castellano"/>
							</SelectField>
						</div>
					</BottomNavigation>
				</Paper>
			</div>
		);
	}
}

Nav.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func,
	router: React.PropTypes.object
};

export default Nav;
