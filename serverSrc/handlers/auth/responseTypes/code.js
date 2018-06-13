import {db} from '../../../mongo'
import uuidGen from 'node-uuid';

module.exports = function code(params, client, cb) {
  if (params.client_secret !== client.client_secret) {
    cb({ type: 'user', message: 'The provided client secret is not valid.'});
  } else {
    let uuid = uuidGen.v4();
    db.code.insert({
      code: uuid,
      client_id: params.client_id,
      client_secret: params.client_secret,
      expiresAt: new Date() + 43200000 // 12 hours
    }, (err, res) => {
      if (err) {cb({type: 'unhandled', message: err})}
      else {
        cb(null, {code: uuid})
      }
    });

  }
}
