

export function unhandledError(error, res) {
  if (process.env.ENV === 'prod') {
    res.status(500).send();
  } else {
    res.status(500).send(error);
  }
}

export function userError(message, res, status) {
    res.status(status || 400).send(message);
}
