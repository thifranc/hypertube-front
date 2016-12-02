import React, {Component} from 'react';
import {Link} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Center from '../util/Center';
import Slider from 'rc-slider';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
			rateMin: '',
			rateMax: '',
			yearMin: '',
			yearMax: '',
			movies: []
		};
		this.ticking = true;
		this.page = 2;

		this.originalLoad = this.originalLoad.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.scrollWatch = this.scrollWatch.bind(this);
		this.columnWatch = this.columnWatch.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.ajaxCall = this.ajaxCall.bind(this);
		this.getValueYear = this.getValueYear.bind(this);
		this.getValueRate = this.getValueRate.bind(this);
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
/*	filterByMaxRate (max) {
		this.state.movies.filter( elem => {
			return elem <= max;
		});
		this.setState({movies : array});
	}
	*/
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
	handleChange(e, index, value) {
		console.log("hola bonjour");
		console.log(value);
		this.setState({genre : value}, this.ajaxCall);
	}
	ajaxCall() {
		fetch('/api/yts/list_movies.json?genre=' + this.state.genre + '&minimum_rating=' + this.state.rateMin , {
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
	getValueYear (e) {
		console.log(e[0]);
		this.setState({yearMin : e[0]});
		this.setState({yearMax : e[1]});
	}
	getValueRate (e) {
		console.log(e);
		this.setState({rateMin : e[0]});
		this.setState({rateMax : e[1]});
	}
	callAPI () {}
	render() {
		return (
			<div>
				{!this.state.movies.length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<div style={styles.root}>
						<GridList cellHeight={'auto'} style={styles.gridList} cols={this.state.column}>
							<Subheader>
								<SelectField
								  floatingLabelText="Genre"
								  value={this.state.genre}
								  onChange={this.handleChange}>
									  <MenuItem value="Action"  primaryText="Action" />
									  <MenuItem value="Animation" primaryText="Animation" />
									  <MenuItem value="Adventure" primaryText="Adventure" />
									  <MenuItem value="Biography" primaryText="Biography" />
									  <MenuItem value="Comedie" primaryText="Comedie" />
									  <MenuItem value="Crime" primaryText="Crime" />
									  <MenuItem value="Documentary" primaryText="Documentary" />
									  <MenuItem value="Drama" primaryText="Drama" />
									  <MenuItem value="Family" primaryText="Family" />
									  <MenuItem value="Fantasy" primaryText="Fantasy" />
									  <MenuItem value="Film-noir" primaryText="Film-noir" />
									  <MenuItem value="History" primaryText="History" />
									  <MenuItem value="Horror" primaryText="Horror" />
									  <MenuItem value="Music" primaryText="Music" />
									  <MenuItem value="Mystery" primaryText="Mystery" />
									  <MenuItem value="Romance" primaryText="Romance" />
									  <MenuItem value="Sci-Fi" primaryText="Sci-Fi" />
									  <MenuItem value="Thriller" primaryText="Thriller" />
									  <MenuItem value="War" primaryText="War" />
									  <MenuItem value="Western" primaryText="Western" />
								</SelectField>
								<Slider min={0} max={12} range={true} defaultValue={[0, 10]} onChange={this.getValueRate} onAfterChange={this.ajaxCall}/>
								<Slider min={0} max={new Date().getFullYear()} range={true} defaultValue={[0, new Date().getFullYear()]} onChange={this.getValueYear} onAfterChange={this.ajaxCall}/>
								//add input search to search by cast
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

export default Search;
