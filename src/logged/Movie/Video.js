import React from 'react';

const Video = (props) => {
	const videoStyle = {
		width: '100%',
	};

	return (
		<video style={videoStyle} src={'http://localhost:' + props.port} autoPlay controls/>
	);
};

export default Video;
