import React from 'react';
import Paper from 'material-ui/Paper';
import Carousel from 'nuka-carousel';
import StarBorder from 'material-ui/svg-icons/toggle/star';
import IconButton from 'material-ui/IconButton';

const MovieInfo = (props) => {
	const movie = props.movie;

	return (
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
	);
};

export default MovieInfo;
