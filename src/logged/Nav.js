import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {browserHistory} from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';

// import MobileTearSheet from '../../../MobileTearSheet';

const account = <FontIcon className="material-icons">account_circle</FontIcon>;
const search = <FontIcon className="material-icons">search</FontIcon>;
const exit = <FontIcon className="material-icons">exit_to_app</FontIcon>;
const people = <FontIcon className="material-icons">people</FontIcon>;

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open : false,
			selectedIndex: 1,
			isHamburger : (window.innerWidth <= 560) ? true : false
		};

		console.log('state : ', this.state.isHamburger)

		this.path = this.props.path;
		this.drawBar = this.drawBar.bind(this);
		this.handleSelectNav = this.handleSelectNav.bind(this);
		this.handleSelectLang = this.handleSelectLang.bind(this);
		this.selectPathFromName = this.selectPathFromName.bind(this);

		this.watchResize = this.watchResize.bind(this);

	}
	componentDidMount() {
		const pathname = this.context.router.getCurrentLocation().pathname;

		if (pathname === '/') {
			this.setState({selectedIndex: 1});
		} else if (pathname === '/profile') {
			this.setState({selectedIndex: 2});
		}
		this.watchResize();
		window.addEventListener('resize', this.watchResize, false);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.watchResize, false);
	}

	componentWillUpdate(nextProps, nextState) {
		this.path = nextProps.path
	}

	watchResize() {
		const width = window.innerWidth;
		if (window.innerWidth <= 560) {
			if (!this.state.isHamburger) {
				this.setState({isHamburger : true})
			}
		}
		else {
			this.setState({isHamburger : false, open : false})
		}
	}

	handleSelectLang(event, index, value) {
		this.context.langChange(value);
	}
	handleSelectNav(index) {
		this.setState({selectedIndex: index});
		if (this.state.open) {
			this.setState({open : false});

		}
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

	drawBar() {
		this.setState(prevState => {
			return {open: !prevState.open};
		});
	}

	render() {
		let navBar;
		const {messages, lang} = this.context;
		const page = this.selectPathFromName();

		if (!this.state.isHamburger) {
			navBar = (
				<Paper zDepth={1} >
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
			);
		}
		else {
			if (this.state.open) {
				navBar = (
				<div>
					<AppBar title="Hypertube" showMenuIconButton={false} iconElementRight={<IconButton><Menu /></IconButton>} onRightIconButtonTouchTap={this.drawBar} />
					<Drawer width={95} open={this.state.open}>
						<MenuItem><BottomNavigationItem style={{marginLeft : '-16px'}} label={messages.nav.search} icon={search} onTouchTap={() => this.handleSelectNav(1)}/></MenuItem>
						<MenuItem><BottomNavigationItem style={{marginLeft : '-16px'}} label={messages.user.user} icon={people} onTouchTap={() => this.handleSelectNav(2)}/></MenuItem>
						<MenuItem><BottomNavigationItem style={{marginLeft : '-16px'}} label={messages.nav.profil} icon={account} onTouchTap={() => this.handleSelectNav(3)}/></MenuItem>
						<MenuItem><BottomNavigationItem style={{marginLeft : '-16px'}} label={messages.nav.logout} icon={exit} onTouchTap={() => this.handleSelectNav(4)}/></MenuItem>
						<MenuItem>
							<SelectField value={lang} onChange={this.handleSelectLang} style={{width: '50px'}}>
								<MenuItem value={'en'} primaryText="En"/>
								<MenuItem value={'fr'} primaryText="Fr"/>
								<MenuItem value={'es'} primaryText="Es"/>
							</SelectField>
						</MenuItem>
	        		</Drawer>
	        	</div>
				);
			}
			else
				navBar = (<AppBar title="Hypertube" showMenuIconButton={false} iconElementRight={<IconButton><Menu /></IconButton>} onRightIconButtonTouchTap={this.drawBar} />)
		}

		return (
			<div>
				{navBar}

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
