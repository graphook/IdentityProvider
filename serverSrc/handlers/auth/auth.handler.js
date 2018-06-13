import {db} from '../../mongo'
import path from 'path'
import responseTypes from './responseTypes/responseTypes.map'
import url from 'url'

module.exports = function(req, res) {
  console.log(req.session);
  req.session.authenticating = req.query;
  res.redirect('/ui/login');
}
