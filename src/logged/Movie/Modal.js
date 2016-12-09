import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import Center from '../../util/Center';

const Video = (props) => (
	<video src={"http://localhost:" + props.port} autoPlay controls/>
);

const Modal = (props) => {
	const modalStyle = {
		width: '100%',
		height: '100vh',
		maxWidth: 'none',
		maxHeight: 'none',
	};

	return (
			<Dialog autoDetectWindowHeight={false} title="Video" modal={true} contentStyle={modalStyle} open={props.open}>
				{!Object.keys(props.stream).length ?
					<Center>
						<CircularProgress size={80} thickness={5}/>
					</Center> :
					<Center>
						<Video port={props.stream.port}/>
					</Center>
				}
		</Dialog>
	);
};

export default Modal;
