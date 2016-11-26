import React, {Component} from 'react';
import 'whatwg-fetch';

class Search extends Component {
	componentDidMount() {
		fetch('/api/v2/list_movies.json', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log(err));
	}
	render() {
		return (
			<div>Search</div>
		);
	}
}

export default Search;
