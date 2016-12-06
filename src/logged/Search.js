import React, {Component} from 'react';
import {Link} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Center from '../util/Center';
import Slider from 'rc-slider';

import 'whatwg-fetch';
import 'rc-slider/assets/index.css';

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},
	loader: {
		height: 'calc(100vh - 56px)'
	}
};

class Search extends Component {
	constructor() {
		super();
		this.state = {
			column: 4,
			genre: '',
			term: '',
			errSearch: '',
			search: '',
			rateMin: 0,
			rateMax: 10,
			yearMin: 0,
			yearMax: new Date().getFullYear(),
			sortBy: '',
			movies: []
		};
		this.ticking = true;
		this.page = 2;

		this.originalLoad = this.originalLoad.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.scrollWatch = this.scrollWatch.bind(this);
		this.columnWatch = this.columnWatch.bind(this);
		this.handleAJAX = this.handleAJAX.bind(this);
		this.handleGetValueYear = this.handleGetValueYear.bind(this);
		this.handleGetValueRate = this.handleGetValueRate.bind(this);
		this.handleSelectSortBy = this.handleSelectSortBy.bind(this);
		this.handleSelectGenre = this.handleSelectGenre.bind(this);
		this.handleLowercase = this.handleLowercase.bind(this);
	}
	componentDidMount() {
		this.originalLoad();
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollWatch, false);
		window.removeEventListener('resize', this.columnWatch, false);
	}
	originalLoad() {
		fetch('/api/yts/list_movies.json?limit=20', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState({movies: res.data.movies});
				this.columnWatch();
				window.addEventListener('scroll', this.scrollWatch, false);
				window.addEventListener('resize', this.columnWatch, false);
			})
			.catch(err => console.log(err));
	}
	specificLoad() { // name date mark
		fetch('/api/yts/list_movies.json?limit=20', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState({movies: res.data.movies});
				this.columnWatch();
				window.addEventListener('scroll', this.scrollWatch, false);
				window.addEventListener('resize', this.columnWatch, false);
			})
			.catch(err => console.log(err));
	}
	loadMore() {
		fetch('/api/yts/list_movies.json?limit=20&page=' + this.page, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				const movies = this.state.movies.concat(res.data.movies);
				this.setState({movies: movies});
				this.page++;
				this.ticking = true;
			})
			.catch(err => console.log(err));
	}
	scrollWatch() {
		if (this.ticking) {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				this.loadMore();
				this.ticking = false;
			}
		}
	}
	columnWatch() {
		const width = window.innerWidth;
		if (width > 1300) {
			this.setState({column: 4});
		} else if (width > 1000 && width < 1300) {
			this.setState({column: 3});
		} else if (width > 800 && width < 1000) {
			this.setState({column: 2});
		} else if (width < 600) {
			this.setState({column: 1});
		}
	}
	handleAJAX() {
		fetch('/api/yts/list_movies.json?genre=' + this.state.genre +
				'&minimum_rating=' + this.state.rateMin +
				'&query_term=' + this.state.search +
				'&sort_by=' + this.state.sortBy, {
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					}
				})
			.then(res => res.json())
			.then(res => {
				return res.data.movies.filter(el => {
					return (
						this.state.yearMin <= el.year && el.year <= this.state.yearMax &&
						el.rating <= this.state.rateMax
					);
				});
			})
			.then(res => {
				this.setState({movies: res});
				this.columnWatch();
				window.addEventListener('scroll', this.scrollWatch, false);
				window.addEventListener('resize', this.columnWatch, false);
			})
			.catch(err => console.log(err));
	}
	handleSelectSortBy(e, i, value) {
		this.setState({sortBy: value}, this.handleAJAX);
	}
	handleSelectGenre(e, i, value) {
		this.setState({genre: value}, this.handleAJAX);
	}
	handleGetValueYear(e) {
		this.setState({yearMin: e[0]});
		this.setState({yearMax: e[1]});
	}
	handleGetValueRate(e) {
		this.setState({rateMin: e[0]});
		this.setState({rateMax: e[1]});
	}
	handleLowercase(e) {
		var regLowercase = new RegExp('^[a-z]*$');
		var err = 'err' + e.target.id;

		this.setState({[err]: !regLowercase.test(e.target.value)},
			this.handleFillChar(e)
		);
	}
	handleFillChar(e) {
		if (!this.state.errSearch) {
			{this.setState({search: e.target.value},
				this.handleAJAX
			);}
		}
	}
	render() {
		const genre = ['Action', 'Animation', 'Adventure',
			'Biography', 'Comedie', 'Crime', 'Documentary',
			'Drama', 'Family', 'Fantasy', 'Film-noir', 'History',
			'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi',
			'Thriller', 'War', 'Western'];
		const sortBy = ['title', 'year', 'rating', 'peers', 'seeds', 'download_count', 'like_count', 'date_added'];
		const {messages} = this.context;
		return (
			<div>
				{!this.state.movies.length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<div style={styles.root}>
						<GridList cellHeight={'auto'} style={styles.gridList} cols={this.state.column}>
							<Subheader>
								<SelectField
									id="genre"
									floatingLabelText={messages.search.genre}
									value={this.state.genre}
									onChange={this.handleSelectGenre}
									>
									{genre.map(el => <MenuItem key={el} value={el} primaryText={el}/>)}
								</SelectField>
								<SelectField
									id="sortBy"
									floatingLabelText={messages.search.sortBy}
									value={this.state.sortBy}
									onChange={this.handleSelectSortBy}
									>
									{sortBy.map(el => <MenuItem key={el} value={el} primaryText={el}/>)}
								</SelectField>
								<TextField
									value={this.state.search}
									onChange={this.handleLowercase}
									id="Search"
									floatingLabelText={messages.search.search}
									hintText={messages.search.search}
									errorText={this.state.errSearch && messages.errors.lowercase}
									/>
								<Slider
									min={this.state.rateMin} max={this.state.rateMax}
									range defaultValue={[this.state.rateMin, this.state.rateMax]}
									onChange={this.handleGetValueRate}
									onAfterChange={this.handleAJAX}
									/>
								<Slider
									min={this.state.yearMin} max={this.state.yearMax} range
									defaultValue={[this.state.yearMin, this.state.yearMax]}
									onChange={this.handleGetValueYear}
									onAfterChange={this.handleAJAX}
									/>
							</Subheader>
							{this.state.movies.map(movie => (
								<Link key={movie.id} to={'/movie/' + movie.id}>
									<GridTile
										title={movie.title}
										subtitle={movie.year}
										actionIcon={<IconButton tooltip={movie.rating} touch={Boolean(true)} tooltipPosition="top-center"><StarBorder color="yellow"/></IconButton>}
										actionPosition="right"
										>
										<img style={{width: '100%'}} src={movie.large_cover_image}/>
									</GridTile>
								</Link>
							))
							}
						</GridList>
					</div>
				}
			</div>
		);
	}
}

Search.contextTypes = {
	lang: React.PropTypes.string,
	messages: React.PropTypes.object,
	langChange: React.PropTypes.func,
	router: React.PropTypes.object
};

export default Search;
