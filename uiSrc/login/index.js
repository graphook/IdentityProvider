require('./index.scss')
require('file?name=login.html!./index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router.jsx';

// Put all the things you want to run as soon as the client loads here.

ReactDOM.render(<Router />, document.getElementById('app'));
