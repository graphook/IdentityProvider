
export default function requireLogin(req, res, next) {
  //TODO: Reactivate after you're done testing.
  console.log('meh', req.session)
  if (!req.session.user) {
    res.status(401).send()
  } else {
    next();
  }
}
