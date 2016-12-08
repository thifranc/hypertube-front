import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import StarBorder from 'material-ui/svg-icons/toggle/star';
import Cross from 'material-ui/svg-icons/navigation/close';
import Tick from 'material-ui/svg-icons/action/done';
import Play from 'material-ui/svg-icons/av/play-arrow';
import IconButton from 'material-ui/IconButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Carousel from 'nuka-carousel';

import Center from '../util/Center';
import ReactDisqus from 'react-disqus';

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
		this.handleNewComment = this.handleNewComment.bind(this);
	}
	componentDidMount() {
		const filmId = this.props.params.id;
		fetch('/api/getTorrent/' + filmId, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			this.setState({movie: res.data.movie});
		})
		.catch(err => console.log(err));

		var data = new FormData();
		data.append('id', filmId);
		fetch('/api/video/view', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.props.token
			},
			body : data
		})
		.catch(err => console.log(err));
	}
    handleNewComment(comment) {
        console.log(comment.text);
    }
	render() {
		const movie = this.state.movie;

		console.log(movie)

		return (
			<div>
				{!Object.keys(movie).length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<div className="MovieContainer">
						<div className="MovieMainColumn">
							<Paper zDepth={2}>
								<div className="MovieMedia">
									<Carousel wrapAround={Boolean(true)} autoplay={Boolean(true)}>
										<img src={movie.large_screenshot_image1} alt="movie large sceenshot 1" onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
										<img src={movie.large_screenshot_image2} alt="movie large sceenshot 2" onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
										<img src={movie.large_screenshot_image3} alt="movie large sceenshot 3" onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
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
									<AppBar
										showMenuIconButton={false}
										title="Torrents"
										/>
									<Table>
										<TableHeader displaySelectAll={Boolean(false)} adjustForCheckbox={Boolean(false)}>
											<TableRow selectable={false}>
												<TableHeaderColumn>Peers</TableHeaderColumn>
												<TableHeaderColumn>Seeds</TableHeaderColumn>
												<TableHeaderColumn>Tracker</TableHeaderColumn>
												<TableHeaderColumn>Quality</TableHeaderColumn>
												<TableHeaderColumn>Loaded</TableHeaderColumn>
												<TableHeaderColumn>Play</TableHeaderColumn>
											</TableRow>
										</TableHeader>
										<TableBody displayRowCheckbox={Boolean(false)}>
											{movie.torrents.map((torrent, index) => (
												<TableRow key={index}>
													<TableRowColumn>{torrent.peers}</TableRowColumn>
													<TableRowColumn>{torrent.seeds}</TableRowColumn>
													<TableRowColumn>Yts</TableRowColumn>
													<TableRowColumn>{torrent.quality}</TableRowColumn>
													<TableRowColumn><Cross color="red"/><Tick color="green"/></TableRowColumn>
													<TableRowColumn><IconButton><Play/></IconButton></TableRowColumn>
												</TableRow>
										))}
										</TableBody>
									</Table>
								</div>




							</Paper>
							<br/>
							<Paper zDepth={2}>
								<AppBar
									showMenuIconButton={false}
									title="Comments"
									/>
								<div className="MovieComments">
									<ReactDisqus
										shortname="localhost-4r6pb8tmz4"
										identifier="123" />
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
