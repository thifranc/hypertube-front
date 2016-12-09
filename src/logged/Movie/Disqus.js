import React from 'react';
import ReactDisqus from 'react-disqus';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

const Disqus = () => (
	<div className="MovieDisqus">
		<Paper zDepth={2}>
			<AppBar
				showMenuIconButton={false}
				title="Comments"
				/>
			<div className="MovieComments">
				<ReactDisqus
					shortname="localhost-4r6pb8tmz4"
					identifier="123" />
			</div>
		</Paper>
	</div>
);

export default Disqus;
