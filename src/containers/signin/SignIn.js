import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import SignInPage from '../../components/SignInPage';

import {setUser} from '../../utils/userInfo';
import {login} from '../../actions/userActions';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onUserNameChange = (username) => {
    this.setState({username})
  };

  onPasswordChange = (password) => {
    this.setState({password})
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({isSubmitted: true});
    const {username, password} = this.state;
    setUser(username, password);
    console.log(this.props);
    this.props.login(username);
  };

  render() {
    const {isLoggedIn} = this.props;
    if (isLoggedIn) {
      return <Redirect to='/'/>;
    } else {
      return <SignInPage handleSubmit={(event) => this.handleSubmit(event)} onUserNameChange={this.onUserNameChange}
                         onPasswordChange={this.onPasswordChange}/>;
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username) => dispatch(login(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
