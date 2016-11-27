import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Center from '../util/Center';

import 'whatwg-fetch';

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
	}
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
				this.setState({movies: res.data.movies});
				console.log(res);
			})
			.catch(err => console.log(err));
	}
	render() {
		return (
			<div>
				{!this.state.movies.length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<div style={styles.root}>
						<GridList cellHeight={'auto'} style={styles.gridList} cols={4}>
							<Subheader>TODO filter</Subheader>
							{this.state.movies.map((movie, i) => (
								<GridTile
									key={i}
									title={movie.title}
									subtitle={movie.year}
									actionIcon={<IconButton tooltip={movie.rating} touch={true} tooltipPosition="top-center"><StarBorder color="yellow"/></IconButton>}
									actionPosition="right"
									>
									<img style={{width: '100%'}} src={movie.large_cover_image}/>
								</GridTile>))
							}
						</GridList>
					</div>
				}
			</div>
		);
	}
}

export default Search;
