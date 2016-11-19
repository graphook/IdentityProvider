import React from 'react';
import request from 'superagent';

const Login = React.createClass({
  login: function(e) {
    e.preventDefault();
    console.log(this.refs)
    request.post('/protected/login')
        .send({
          email: this.refs.email.value,
          password: this.refs.password.value
        })
        .end((err, res) => {
          if (res.status === 200) {
            window.location.href = '/protected/postauth'
          } else {
            alert(res.body);
          }
         });
  },
  postAuth: function() {
    console.log(this.props);
  },
  render() {
    return (
      <div>
      <form onSubmit={this.login}>
        <h1>Sign in with your Zenow account.</h1>
        <label htmlFor="email">Email</label>
        <input ref="email" type="text" id="email" />
        <label htmlFor="password">Password</label>
        <input ref="password" type="password" id="password" />
        <input type="submit" value="Log In" />
      </form>
    </div>
    )
  }
});

export default Login;
