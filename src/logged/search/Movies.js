import {Link} from 'react-router';
import React, {Component} from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star';

class Movies extends Component {
	render () {
		return (
			<Link key={this.props.id} to={'/movie/' + this.props.movie.id}>
				<GridTile
					actionIcon={
						<IconButton
							tooltip={this.props.movie.rating}
							touch={Boolean(true)}
							tooltipPosition="top-center">
							<StarBorder color="yellow"/>
						</IconButton>
					}
					actionPosition="right"
					style={this.props.movie.view}
					title={this.props.movie.title}
					subtitle={this.props.movie.year}
				>
				<img alt="movie" style={{width: '100%'}} src={this.props.movie.large_cover_image} />
				</GridTile>
			</Link>
		);
	}
}

export default Movies;