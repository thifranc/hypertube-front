import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './App.css';

const Tmp = () => null;

class App extends Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Tmp}>
					<IndexRoute component={Tmp}/>
					<Route path="user/:id" component={Tmp}/>
					<Route path="profile" component={Tmp}/>
					<Route path="movie/:id" component={Tmp}/>
				</Route>
				<Route path="login" component={Tmp}/>
				<Route path="register" component={Tmp}/>
				<Route path="forget" component={Tmp}/>
				<Route path="reset/:token" component={Tmp}/>
				<Route path="*" component={Tmp}/>
			</Router>
		);
	}
}

export default App;
