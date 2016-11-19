import React from 'react';
import { Router, Route, browserHistory } from 'react-router'

import Login from './Login.jsx'

const AppRouter = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
          <Route path="*" component={ Login } />
      </Router>
    );
  }
});

export default AppRouter;
