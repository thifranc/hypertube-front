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
			id: ''
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.startStream = this.startStream.bind(this);
		this.closeStream = this.closeStream.bind(this);
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
				console.log(res);
				this.setState({movie: res.data.movie});
			})
			.catch(err => console.log(err));
	}
	handleOpen() {
		this.setState({open: true});
	}
	handleClose() {
		this.setState({open: false});
	}
	startStream(provider, id) {
		if (provider === 'extratorrent') {
			id = encodeURIComponent(id);
		}
		this.handleOpen();
		this.setState({provider: provider, id: id});
		fetch(`/api/video/${provider}/${id}`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState({stream: res.data});
			})
			.catch(err => console.log(err));
	}
	closeStream(provider, id) {
		console.log(provider, id);
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
				console.log(res);
				this.setState({stream: {}});
			})
			.catch(err => console.log(err));
	}
	render() {
		const movie = this.state.movie;
		return (
			<div>
				<Modal close={this.closeStream} provider={this.state.provider} id={this.state.id} stream={this.state.stream} open={this.state.open}/>
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
