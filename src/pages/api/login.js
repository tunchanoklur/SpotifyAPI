require('dotenv').config()

const clientId = process.env.CLIENT_ID
const redirectURI = process.env.REDIRECT_URI

export default (req, res) => {
  const scopes = 'user-read-private user-read-email'

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200

  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' +
      clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirectURI),
  )
}
