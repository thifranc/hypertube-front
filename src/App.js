import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Login from './Login';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {yellow800, yellow900, yellow300} from 'material-ui/styles/colors';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: yellow800,
    primary2Color: yellow900,
    primary3Color: yellow300,
  }
});

injectTapEventPlugin();
const Tmp = () => null;

class App extends Component {
	render() {
		return (
<MuiThemeProvider muiTheme={muiTheme}>
			<Router history={browserHistory}>
				<Route path="/" component={Tmp}>
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
