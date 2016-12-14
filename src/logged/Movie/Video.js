import React from 'react';
const Video = (props) => {
	const videoStyle = {
		width: '100%',
	};

	const url = `http://${window.location.hostname}:`;
	return (
		<video style={videoStyle} src={url + props.port} autoPlay controls>
			{props.subtitles.map(sub => (<track key={sub.lang} label={sub.lang} kind="subtitles" srcLang="en" src={url + '4242/subtitles/' + sub.path}/>))}
		</video>
	);
};

export default Video;
