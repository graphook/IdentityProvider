import {db} from '../../mongo'
import {unhandledError, userError} from '../util/handleError'
import bcyrpt from 'bcrypt-nodejs'

module.exports = function(req, res) {
  db.user.findOne({email: req.body.email}, (err, user) => {
    if (err) { unhandledError(err, res) }
    else if (user == null) {
      userError('The user does not exist.', res, 400);
    } else if (bcyrpt.compareSync(req.body.password, user.password)) {
      req.session.user = {
        email: user.email
      };
      res.status(200).send('Logged In');
    } else {
      userError('Wrong password.', res, 400);
    }
  });
}
