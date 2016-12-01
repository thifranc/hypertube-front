import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import Center from '../util/Center';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import StarBorder from 'material-ui/svg-icons/toggle/star';
import Eye from 'material-ui/svg-icons/image/remove-red-eye';
import Play from 'material-ui/svg-icons/av/play-arrow';
import IconButton from 'material-ui/IconButton';
import Carousel from 'nuka-carousel';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import 'whatwg-fetch';
import './Movie.css';

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
				console.log(res.data.movie);
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
						<div className="MovieMainColumn">
							<Paper zDepth={2}>
								<div className="MovieMedia">
									<Carousel wrapAround={Boolean(true)} autoplay={Boolean(true)}>
										<img src={movie.large_screenshot_image1} alt="movie large cover image" onLoad={() => {window.dispatchEvent(new Event('resize'));}} />
										<img src={movie.large_screenshot_image2} alt="movie large cover image" onLoad={() => {window.dispatchEvent(new Event('resize'));}} />
										<img src={movie.large_screenshot_image3} alt="movie large cover image" onLoad={() => {window.dispatchEvent(new Event('resize'));}} />
									</Carousel>
								</div>
								<div className="MovieInfo">
									<h1>{movie.title}</h1>
									<ul className="MovieInfoElemBlock">
										<li className="MovieInfoElem">{movie.year}</li>
										<li className="MovieInfoElem">{movie.mpa_rating}</li>
										<li className="MovieInfoElem"><IconButton tooltip={movie.rating} touch={Boolean(true)} tooltipPosition="bottom-center"><StarBorder color="#f3e95a"/></IconButton></li>
									</ul>
									<p>{movie.description_full}</p>
								</div>
							</Paper>
						</div>
						<div className="MovieSecColumn">
							<Paper zDepth={2}>
								<div className="MovieTorrentBlock">
									<Table>
										<TableHeader>
											<TableRow selectable={false}>
												<TableHeaderColumn colSpan="5" tooltip="Torrents" style={{textAlign: 'center'}}>Torrents</TableHeaderColumn>
											</TableRow>
											<TableRow selectable={false}>
												<TableHeaderColumn tooltip="Play">Play</TableHeaderColumn>
												<TableHeaderColumn tooltip="Peers">Peers</TableHeaderColumn>
												<TableHeaderColumn tooltip="Seeds">Seeds</TableHeaderColumn>
												<TableHeaderColumn tooltip="Tracker">Tracker</TableHeaderColumn>
												<TableHeaderColumn tooltip="Viewed">View</TableHeaderColumn>
											</TableRow>
										</TableHeader>
										<TableBody>
									{movie.torrents.map((torrent, index) => (
										<TableRow key={index}>
											<TableRowColumn><Play/></TableRowColumn>
											<TableRowColumn>{torrent.peers}</TableRowColumn>
											<TableRowColumn>{torrent.seeds}</TableRowColumn>
											<TableRowColumn>Yts</TableRowColumn>
											<TableRowColumn><Eye/></TableRowColumn>
										</TableRow>
										))}
										</TableBody>
									</Table>
								</div>
							</Paper>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default Movie;
