import '../../util/styles.css';
import Center from '../../util/Center';
import React, {Component} from 'react';
import Subheader from 'material-ui/Subheader';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';

import Filter from './Filter';
import Movies from './Movies';

class Search extends Component {
	constructor () {
		super();
		this.state = {
			genre : 'all',
			search: '0',
			movies : [],
			column : 4,
			onLoad : true,
			sortBy : 'title',
			rate : {min : 0, max : 10},
			years : {min : 1970, max : new Date().getFullYear()}
		};
		this.page = 1;
		this.isMount = true;
		this.orderBy = 'desc';
		
		this.getMovies = this.getMovies.bind(this);
		this.handleRate = this.handleRate.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handleYears = this.handleYears.bind(this);
		this.handleGenre = this.handleGenre.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleKey = this.handleKey.bind(this);

		this.markIsView = this.markIsView.bind(this);
		this.columnWatch = this.columnWatch.bind(this);
		this.scrollWatch = this.scrollWatch.bind(this);
	}	

	componentDidMount() {
		this.getMovies();
		window.addEventListener('scroll', this.scrollWatch, false);
		window.addEventListener('resize', this.columnWatch, false);
	}

	componentWillUnmount() {
		this.isMount = false;
		window.removeEventListener('scroll', this.scrollWatch, false);
		window.removeEventListener('resize', this.columnWatch, false);
	}

	markIsView(movies) {
		return fetch('/api/video/view', {
			method : 'GET',
			credentials : 'include',
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			if (!res.data || !res.data[0])
				return movies;
			let myView = [];
			
			res.data.map((obj) => myView.push(obj.id_movies) );
			for (var i = movies.length - 1; i >= 0; i--) {
				if (myView.includes(movies[i].id))
					movies[i].view = 'isView';
			}
			return movies;
		})
		.catch(err => console.log('ERROR FATAL : ', err));
	}

	getMovies(who) {
		const params = 'limit=20&page=' + this.page + '&genre=' + this.state.genre + '&minimum_rating=' + this.state.rate.min +
			'&query_term=' + this.state.search + '&sort_by=' + this.state.sortBy + '&order_by=' + this.orderBy;

		window.fetch('/api/yts/list_movies.json?' + params, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
		})
		.then(res => res.json())
		.then(res => {
			// if (res.data.movie_count === 0) {
			if (!res.data.movies) {
				this.setState(who !== 'scroll' ? {movies : [], onLoad : false} : {movies : this.state.movies, onLoad : false});
				return Promise.reject('No more...');
			}
			return res.data.movies.filter(el => {
				return this.state.years.min <= el.year && el.year <= this.state.years.max && el.rating <= this.state.rate.max;
			});
		})
		.then(res => this.markIsView(res))
		.then(res => {
			res = (who === 'scroll') ? this.state.movies.concat(res) : res;
			this.isMount && this.setState({movies : res, onLoad : false});
		})
		.catch(err => {
			console.log('ERROR => ', err) //delete catch en production
		});
	}
	handleKey(e) {
		if (e.key === 'Enter') {
			e.target.blur();
		}
	}
	handleGenre(event, index, value) {
		this.page = 1;
		this.setState({genre : value, onLoad : true}, this.getMovies);
	}
	handleSort(event, index, value) {
		this.page = 1;
		this.setState({sortBy : value, onLoad : true}, this.getMovies);
	}
	handleSearch(event) {
		this.page = 1;
		this.setState({search : event.target.value, onLoad : true}, this.getMovies);
	}
	handleYears(value) {
		this.page = 1;
		this.setState({years : {min : value[0], max : value[1]}, onLoad : true});
	}
	handleRate(value) {
		this.page = 1;
		this.setState({rate : {min : value[0], max : value[1]}, onLoad : true});
	}

	columnWatch () {
		const width = window.innerWidth;
		if (width > 1300)
			this.setState({column: 4});
		else if (width > 1000 && width < 1300)
			this.setState({column: 3});
		else if (width > 800 && width < 1000)
			this.setState({column: 2});
		else if (width < 600)
			this.setState({column: 1});
	}
	
	scrollWatch() {
		if (!this.state.onLoad && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			let that = this;
			window.requestAnimationFrame(function() {
				that.page++;
				that.getMovies('scroll');
    		});
		}
	}

	render () {
		let display = [];

		if (this.state.onLoad)
			display = (<Center className='loader'><CircularProgress size={145} thickness={5}/></Center>)
		else {
			if (this.state.movies.length === 0)
				display = <div>No movies found</div>
			else
				display.push(this.state.movies.map((movie, i) => (<Movies key={i} movie={movie} id={i}/>)));
		}
		return (
			<div className='root'>
				<GridList cellHeight={'auto'} cols={this.state.column}>
					<Subheader>
						<Filter
							genre={this.state.genre}
							sortBy={this.state.sortBy}
							rate={this.state.rate}
							years={this.state.years}
							handleSort={this.handleSort}
							handleGenre={this.handleGenre}
							handleSearch={this.handleSearch}
							handleRate={this.handleRate}
							handleKey={this.handleKey}
							handleYears={this.handleYears}
							handleRange={this.getMovies}
						/> 
					</Subheader>
					{ display }
				</GridList>
			</div>
		);
	}
}

Search.contextTypes = {
	messages: React.PropTypes.object
};

export default Search;
