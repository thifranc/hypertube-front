import '../util/styles.css';
import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Center from '../util/Center';
import Modal from './Movie/Modal';
import MovieInfo from './Movie/MovieInfo';
import Torrents from './Movie/Torrents';
import Disqus from './Movie/Disqus';

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
			movie: {},
			open: false,
			stream: {},
			provider: '',
			subtitles: [],
			id: ''
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.startStream = this.startStream.bind(this);
		this.closeStream = this.closeStream.bind(this);
		this.getSubtitles = this.getSubtitles.bind(this);
		this.unload = null;
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
			this.getSubtitles(res.data.movie.imdb_code);
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
			body: data
		})
		.catch(err => console.log(err));
	}
	handleOpen() {
		this.setState({open: true});
	}
	handleClose() {
		this.setState({open: false});
	}
	startStream(provider, id, movieId) {
		console.log('movieId', movieId);
		if (provider === 'extratorrent') {
			id = encodeURIComponent(id);
		}
		this.unload = () => this.closeStream(provider, id);
		window.addEventListener('beforeunload', this.unload, false);
		this.handleOpen();
		this.setState({provider: provider, id: id});
		fetch(`/api/video/${provider}/${id}/${movieId}`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				this.setState({stream: res.data});
			})
			.catch(err => console.log(err));
	}
	closeStream(provider, id) {
		window.removeEventListener('beforeunload', this.unload);
		this.handleClose();
		fetch(`/api/video/${provider}/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				this.setState({stream: {}});
			})
			.catch(err => console.log(err));
	}
	getSubtitles(imdbId) {
			fetch(`/api/video/subtitles/${imdbId}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				console.log(res.data.subtitles);
				this.setState({subtitles: res.data.subtitles});
			})
			.catch(err => console.log(err));
	}
	render() {
		const movie = this.state.movie;

		return (
			<div style={{marginTop: '58px', marginBottom: '39px'}}>
				<Modal close={this.closeStream} provider={this.state.provider} subtitles={this.state.subtitles} id={this.state.id} stream={this.state.stream} open={this.state.open}/>
				{!Object.keys(movie).length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<div className="MovieContainer">
						<div className="MovieContainerColumn">
							<MovieInfo movie={movie}/>
							<Torrents movie={movie} startStream={this.startStream}/>
						</div>
						<Disqus/>
					</div>
				}
			</div>
		);
	}
}

export default Movie;
