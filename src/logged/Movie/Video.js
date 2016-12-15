import React from 'react';
import config from '../../config';

const Video = (props) => {
	const videoStyle = {
		width: '100%',
		maxHeight: "70vh"
	};

	const url = `http://${config.host}:`;
	return (
		<video style={videoStyle} src={url + props.port} autoPlay controls={props.controls}>
			{props.subtitles.map(sub => (<track key={sub.lang} label={sub.lang} kind="subtitles" srcLang="en" src={url + '4242/subtitles/' + sub.path}/>))}
		</video>
	);
};

export default Video;
