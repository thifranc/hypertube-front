import React from 'react';
const Video = (props) => {
	const videoStyle = {
		width: '100%',
	};

	console.log('Port', props.port);
	return (
		<video style={videoStyle} src={'http://localhost:' + props.port} autoPlay controls>
			{props.subtitles.map(sub => (<track key={sub.lang} label={sub.lang} kind="subtitles" srcLang="en" src={'http://localhost:4242/subtitles/' + sub.path}/>))}
		</video>
	);
};

export default Video;
