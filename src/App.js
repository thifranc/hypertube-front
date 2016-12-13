import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {amber100 as primary1Color, orange100 as primary2Color, brown200 as primary3Color} from 'material-ui/styles/colors';
import LangProvider from './LangProvider';

import './App.css';
import Register from './visitor/Register';
import Forget from './visitor/Forget';
import Login from './visitor/Login';
import Reset from './visitor/Reset';

import Logged from './logged/Logged';
import Search from './logged/search';
import Profile from './logged/Profile';
import Movie from './logged/Movie';
import User from './logged/User';
import allUsers from './logged/allUsers';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: primary1Color,
		primary2Color: primary2Color,
		primary3Color: primary3Color
	}
});

const Tmp = (nextState, replace) => {
	replace({pathname: '/'});
};

function requireAuth(nextState, replace, cb) {
	if (localStorage.getItem('token')) {
		fetch('/api/' + localStorage.getItem('token'), {
			method : 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			}
		})
		.then(res => res.json())
		.then(res => {
			if (res.error) {
				replace('/login');
			}
			else
				localStorage.setItem('token', res.data.token);
			cb();
		})
		.catch(err => console.log('ERROR token : ', err));
	}
	else {
		replace('/login');
		cb();
	}
}

class App extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<LangProvider>
					<Router history={browserHistory}>
						<Route path="/" component={Logged}>
							<IndexRoute component={Search} onEnter={requireAuth}/>
							<Route path="/user/:id" component={User} onEnter={requireAuth}/>
							<Route path="allUsers" component={allUsers} onEnter={requireAuth}/>
							<Route path="profile" component={Profile} onEnter={requireAuth}/>
							<Route path="movie/:id" component={Movie} onEnter={requireAuth}/>
						</Route>
						<Route path="login" component={Login}/>
						<Route path="register" component={Register}/>
						<Route path="forget" component={Forget}/>
						<Route path="reset/:id/:token" component={Reset}/>
						<Route path="*" onEnter={Tmp}/>
					</Router>
				</LangProvider>
			</MuiThemeProvider>
		);
	}
}

export default App;
