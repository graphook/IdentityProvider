import {db} from '../../mongo'
import path from 'path'
import responseTypes from './responseTypes/responseTypes.map'
import {unhandledError, userError} from '../util/handleError'
import url from 'url'
import checkQuery from '../util/checkQuery'

const requiresParams = [
  'response_type',
  'client_id',
  'redirect_uri'
]

module.exports = function(req, res) {
  let authenticating = req.session.authenticating || {};
  let queryError = checkQuery(requiresParams, authenticating)
  if (queryError) {
    userError('The field ' + queryError + ' must be present.', res)
  } else if (!responseTypes[authenticating.response_type]) {
    userError('The response type ' + authenticating.response_type + ' is not supported.', res)
  } else {
    db.client.findOne({ 'client_id': authenticating.client_id }, (err, client) => {
      if (err) { unhandledError(err, res) }
      else if (client == null) {
        userError(authenticating.client_id + ' is not a valid client id.', res, 401);
      } else {
        let uriOkay = false;
        client.redirect_uris.forEach((regex) => {
          regex = new RegExp(regex);
          if (regex.test(authenticating.redirect_uri)) {
            uriOkay = true;
          }
        });
        if (uriOkay) {
          responseTypes[authenticating.response_type](authenticating, client, (err, sendParams) => {
            if (err) {
              if (err.type === 'user') {
                userError(err.message, res, err.status);
              } else {
                unhandledError(err.message, res);
              }
            } else {
              let formattedUrl = url.parse(authenticating.redirect_uri);
              formattedUrl.query = formattedUrl.query || {};
              Object.assign(formattedUrl.query, sendParams);
              res.redirect(url.format(formattedUrl));
            }
          });
        } else {
          userError('Not allowed to redirect to ' + authenticating.redirect_uri, res, 401);
        }
      }
    });
  }
}
