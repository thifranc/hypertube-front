import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {yellow300 as primary1Color, yellow200 as primary2Color, yellow100 as primary3Color} from 'material-ui/styles/colors';
import T from 'i18n-react';

import lang from './lang';

import Logged from './logged/Logged';
import Login from './visitor/Login';
import './App.css';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: primary1Color,
		primary2Color: primary2Color,
		primary3Color: primary3Color
	}
});

const Tmp = () => null;

injectTapEventPlugin();
T.setTexts(lang.en);

class App extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Router history={browserHistory}>
					<Route path="/" component={Logged}>
						<IndexRoute component={Tmp}/>
						<Route path="user/:id" component={Tmp}/>
						<Route path="profile" component={Tmp}/>
						<Route path="movie/:id" component={Tmp}/>
					</Route>
					<Route path="login" component={Login}/>
					<Route path="register" component={Tmp}/>
					<Route path="forget" component={Tmp}/>
					<Route path="reset/:token" component={Tmp}/>
					<Route path="*" component={Tmp}/>
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default App;
