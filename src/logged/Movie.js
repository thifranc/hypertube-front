import '../util/styles.css';
import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import Center from '../util/Center';
import Modal from './Movie/Modal';
import MovieInfo from './Movie/MovieInfo';
import Torrents from './Movie/Torrents';
import Disqus from './Movie/Disqus';
import io from 'socket.io-client';
import config from '../config';
import FlatButton from 'material-ui/FlatButton';

const socket = io(`http://${config.host}:4242`);

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
			heavyLoad: false,
			stream: {},
			provider: '',
			subtitles: [],
			id: ''
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleHeavyOpen = this.handleHeavyOpen.bind(this);
		this.handleHeavyClose = this.handleHeavyClose.bind(this);
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
	}
	componentWillUnmount() {
		if (this.state.provider && this.state.id) {
			fetch(`/api/video/${this.state.provider}/${this.state.id}`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.catch(err => console.log(err));
		}
	}
	handleOpen() {
		this.setState({open: true});
	}
	handleClose() {
		this.setState({open: false});
	}
	handleHeavyOpen() {
		this.setState({heavyLoad: true});
	}
	handleHeavyClose() {
		this.setState({heavyLoad: false});
	}
	startStream(provider, id, movieId) {
		var data = new FormData();
		data.append('id', movieId);
		fetch('/api/video/view', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.props.token
			},
			body: data
		})
		.catch(err => console.log(err));

		if (provider === 'extratorrent') {
			id = encodeURIComponent(id);
		}
		this.unload = () => this.closeStream(provider, id);
		window.addEventListener('beforeunload', this.unload, false);
		this.handleOpen();
		this.setState({provider: provider, id: id});
		socket.emit('video', {provider: provider, hash: id, movie_id: movieId}, (res) => {
			if (!res.create) {
				this.handleClose();
				this.handleHeavyOpen();
			} else {
				this.setState({stream: res});
			}
		});
	}
	closeStream(provider, id, changeState = true) {
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
				this.setState({subtitles: res.data.subtitles});
			})
			.catch(err => console.log(err));
	}
	render() {
		const movie = this.state.movie;
		const actions = [<FlatButton label="Cancel" primary={true} onTouchTap={this.handleHeavyClose}/>];

		return (
			<div style={{marginTop: '58px', marginBottom: '39px'}}>
				<Dialog actions={actions} modal={false} open={this.state.heavyLoad} onRequestClose={this.handleHeavyClose}>
					Server is under heavy load come back later!
				</Dialog>
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
