import {db} from '../../mongo'
import grandTypes from './grantTypes/grantTypes.map.js'
import {unhandledError, userError} from '../util/handleError'

module.exports = function(req, res) {
  let query = req.query;
  if (!grantTypes[query.grant_type]) {
    userError('The grant type ' + query.grant_type + ' is not supported.', res)
  }
  responseTypes[authenticating.response_type](query, (err, sendBody) => {
    if (err) {
      if (err.type === 'user') {
        userError(err.message, res, err.status);
      } else {
        unhandledError(err.message, res);
      }
    } else {
      res.status(200).send(sendBody);
    }
  });
}
