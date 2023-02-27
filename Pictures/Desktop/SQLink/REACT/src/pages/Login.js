import React, { Component } from "react";
import { connect } from 'react-redux';
import ValidatedLoginForm from "../component/ValidatedLoginForm";
import LoadingSpinner from "../component/LoadingSpinner"
import { loginUser } from "../redux/actions";

class Login extends Component {
  onUserLogin = (user) => {
    this.props.loginUser(user);
    if (this.props.user.token) {
      this.props.history.push('info');
    }
  }
  render() {
    const { loading } = this.props;
    return (
      <>
        <ValidatedLoginForm onUserLogin={this.onUserLogin} />
        {loading && <LoadingSpinner />}
      </>
    );
  }
};
function mapStateToProps(state) {
  return {
    loading: state.user.loading,
    token: state.user.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (user) => dispatch(loginUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);