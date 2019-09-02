require('dotenv').config()

const clientId = process.env.CLIENT_ID
const redirectURI = process.env.REDIRECT_URI

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  var scopes = 'user-read-private user-read-email'
  if (req.query.code) {
    console.log(req.query.code)
    res.redirect('http://localhost:3000/')
    return
  }
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirectURI),
  )
}
