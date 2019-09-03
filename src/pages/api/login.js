require('dotenv').config()

const clientId = process.env.CLIENT_ID
const redirectURI = process.env.REDIRECT_URI

export default (req, res) => {
  const scopes = 'user-read-private user-read-email'

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200

  if (req.query.code) {
    res.cookie('spotify-token', req.query.code, {
      path: '/',
      maxAge: 86400,
    })

    res.redirect('/')
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
