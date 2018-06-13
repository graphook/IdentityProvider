import path from 'path'

module.exports = function(route, req, res) {
  res.sendFile(path.join(__dirname, '../', route))
}
