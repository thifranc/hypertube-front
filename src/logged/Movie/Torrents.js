import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Play from 'material-ui/svg-icons/av/play-arrow';

const Torrents = (props) => {
	const movie = props.movie;

	return (
		<div className="MovieSecColumn">
			<Paper zDepth={2}>
				<div className="MovieTorrentBlock">
					<AppBar
						showMenuIconButton={false}
						title="Torrents"
						/>
					<Table>
						<TableHeader displaySelectAll={Boolean(false)} adjustForCheckbox={Boolean(false)}>
							<TableRow selectable={false}>
								<TableHeaderColumn>Peers</TableHeaderColumn>
								<TableHeaderColumn>Seeds</TableHeaderColumn>
								<TableHeaderColumn>Tracker</TableHeaderColumn>
								<TableHeaderColumn>Size</TableHeaderColumn>
								<TableHeaderColumn>Play</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={Boolean(false)}>
							{movie.torrents
								.map((torrent, index) => (
								<TableRow key={index}>
									<TableRowColumn>{torrent.peers}</TableRowColumn>
									<TableRowColumn>{torrent.seeds}</TableRowColumn>
									<TableRowColumn>{torrent.hash ? "yts" : "extratorrent"}</TableRowColumn>
									<TableRowColumn>{torrent.size}</TableRowColumn>
									<TableRowColumn><IconButton onClick={(e) => props.startStream(torrent.hash ? "yts" : "extratorrent", torrent.hash || torrent.torrent_link, props.movie.id)}><Play/></IconButton></TableRowColumn>
								</TableRow>
						))}
						</TableBody>
					</Table>
				</div>
			</Paper>
		</div>
	);
};

export default Torrents;
