import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Cross from 'material-ui/svg-icons/navigation/close';
import Tick from 'material-ui/svg-icons/action/done';
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
			stream: {}
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose= this.handleClose.bind(this);
		this.startStream = this.startStream.bind(this);
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
	};
	handleClose() {
		this.setState({open: false});
	};
	startStream(provider, id) {
		console.log(provider, id);
		if (provider === 'extratorrent') {
			id = encodeURIComponent(id);
		}
		this.handleOpen();
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
	render() {
		const movie = this.state.movie;
		return (
			<div>
				<Modal stream={this.state.stream} open={this.state.open}/>
				{!Object.keys(movie).length ?
					<Center style={styles.loader}><CircularProgress size={80} thickness={5}/></Center> :
					<div className="MovieContainer">
							<MovieInfo movie={movie}/>
							<Torrents movie={movie} startStream={this.startStream}/>
					</div>
				}
				<Disqus/>
			</div>
		);
	}
}

export default Movie;
