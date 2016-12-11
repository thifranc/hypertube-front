import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Close from 'material-ui/svg-icons/navigation/close';
import Center from '../../util/Center';
import Video from './Video';

const Modal = (props) => {
	const modalStyle = {
		width: '90%',
		maxWidth: 'none',
		height: '100vh'
	};
	const btnStyle = {
		marginBottom: '24px'
	};

	return (
		<Dialog autoDetectWindowHeight={Boolean(false)} modal={true} contentStyle={modalStyle} open={props.open}>
			<Center>
				<RaisedButton
					label="Close"
					labelPosition="before"
					primary={true}
					style={btnStyle}
					icon={<Close/>}
					onClick={(e) => {props.close(props.provider, props.id)}}
				/>
			</Center>
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
