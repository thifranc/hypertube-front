import React, {Component} from 'react';

import Center from './util/Center.js';

class Footer extends Component {

  render() {
    return (
		<div style={{height:50, backgroundColor:"#FCCE68"}}>
		  <Center>
			<img src="/picture/logo2.png"/>
			<img style={{marginBottom:"10px"}} src="/picture/logo.png"/>
		  </Center>
		</div>
    );
  }
}

export default Footer;
