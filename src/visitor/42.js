import React, { PropTypes, Component } from 'react';

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  const code = vars.map(i => {
    const pair = i.split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  })
  .filter(i => {
    if (i)
      return i;
  });
  return code[0];
}

class Login42 extends Component {
  static propTypes = {
    scope: PropTypes.string,
    className: PropTypes.string,
    buttonText: PropTypes.string,
    cb: PropTypes.func.isRequired,
    children: React.PropTypes.node,
    onFailure: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    route : PropTypes.string.isRequired
  };

  static defaultProps = {
    scope: 'public',
    buttonText: '42'
  };

  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  componentDidMount() {
    if (window.location.search.includes('code')) {
      var data = new FormData();
      data.append('code', getQueryVariable('code'))
      data.append('grant_type', 'authorization_code');
      data.append('redirect_uri', this.props.redirectUri);

      fetch(this.props.route, {
        method : 'POST',
        body : data
      })
      .then(res => this.props.cb(res))
      .catch(error => {
        console.log('Error : ', error);
      });
    } else if (window.location.search.includes('error')) {
      this.props.onFailure({
        error: getQueryVariable('error'),
        error_reason: getQueryVariable('error_reason'),
        error_description: getQueryVariable('error_description')
      });
    }
  }

  onBtnClick() {
    const { clientId, scope } = this.props;
    const redirectUri = this.props.redirectUri || window.location.href;
    window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public`;
  }

  render() {
    const defaultStyle = {
      display: 'inline-block',
      color: '#fff',
      width: 200,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 2,
      fontSize: 16,
      fontWeight: 'bold',
      border: '1px solid transparent',
      fontFamily: '"proxima-nova", "Helvetica Neue", Arial, Helvetica, sans-serif',
    };
    const { className, buttonText, children } = this.props;
    return (
      <button className={className} onClick={this.onBtnClick} style={className ? {} : defaultStyle}>
        { children ? children : buttonText }
      </button>
    );
  }
}

export default Login42;