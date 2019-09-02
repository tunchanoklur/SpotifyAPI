const clientId = 'd57ab4103ced402191e4d0b305a3c241'
const redirectURI = 'http://localhost:3000/'

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  var scopes = 'user-read-private user-read-email'

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
