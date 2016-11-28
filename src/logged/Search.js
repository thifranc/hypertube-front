import React, {Component} from 'react';
import {Link} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star';
import Subheader from 'material-ui/Subheader';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import Center from '../util/Center';

import 'whatwg-fetch';

const eye = <FontIcon className="material-icons">remove_red_eyes</FontIcon>;

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
			movies: []
		};
		this.ticking = true;
		this.page = 2;

		this.originalLoad = this.originalLoad.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.scrollWatch = this.scrollWatch.bind(this);
	}
	componentDidMount() {
		this.originalLoad();
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollWatch, false);
	}
	originalLoad() {
		fetch('/api/v2/list_movies.json?limit=20', {
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
				window.addEventListener('scroll', this.scrollWatch, false);
			})
			.catch(err => console.log(err));
	}
	loadMore() {
		fetch('/api/v2/list_movies.json?limit=20&page=' + this.page, {
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
	render() {
		return (
			<div>
				{!this.state.movies.length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<div style={styles.root}>
						<GridList cellHeight={'auto'} style={styles.gridList} cols={4}>
							<Subheader>TODO filter</Subheader>
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
