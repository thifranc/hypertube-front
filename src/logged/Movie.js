import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import Center from '../util/Center';

import 'whatwg-fetch';
import './Movie.css';

const star = <FontIcon color="yellow" className="material-icons">star_rate</FontIcon>;

const styles = {
	loader: {
		height: 'calc(100vh - 56px)'
	}
};

class Movie extends Component {
	constructor() {
		super();
		this.state = {
			movie: {}
		};
	}
	componentDidMount() {
		const filmId = this.props.params.id;
		fetch('/api/yts/movie_details.json?movie_id=' + filmId + '&with_images=true', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				this.setState({movie: res.data.movie});
				console.log(res);
			})
			.catch(err => console.log(err));
	}
	render() {
		const movie = this.state.movie;
		return (
			<div>
				{!Object.keys(movie).length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<div className="MovieContainer">
						<div className="MovieBackground" style={{backgroundImage: 'url(' + movie.large_screenshot_image1 + ')'}}></div>
						<div className="MovieInfoBlock">
							<h1>{movie.title}</h1>
							<ul>
								<li>{movie.year}</li>
								<li>{movie.rating} {star}</li>
							</ul>
							<p>{movie.description_full}</p>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default Movie;
