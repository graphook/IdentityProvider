import {db} from '../../mongo'
import {unhandledError, userError} from '../util/handleError'
import bcyrpt from 'bcrypt-nodejs'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = function(req, res) {
  let body = req.body;
  if (!emailRegex.test(body.email)) {
    userError(body.email + ' is not an acceptable email.', res);
  } else {
    db.user.find({ email: body.email }).toArray((err, usersWithEmail) => {
      if (err) { unhandledError(err, res) }
      else if (usersWithEmail.length > 0) {
        userError('The email ' + body.email + ' is already registered.', res, 409)
      } else {
        db.user.insert({
          email: body.email,
          password: bcyrpt.hashSync(body.password)
        }, (err) => {
          if (err) { unhandledError(err, res) }
          else {
            res.status(201).send();
          }
        });
      }
    })
  }
}
