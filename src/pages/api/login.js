import Cookies from 'universal-cookie'

const clientId = 'd57ab4103ced402191e4d0b305a3c241'
const redirectURI = 'http://localhost:3000/api/login'

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  var scopes = 'user-read-private user-read-email'
  if (req.query.code) {
    console.log('TOKEN', req.query.code)
    console.log('REQ', req.cookies)
    const cookies = new Cookies(req.headers.cookie)
    cookies.set('spotify-token', req.query.code, {
      path: '/',
      domain: 'http://localhost:3000/',
    })
    console.log('GET COOKIES', cookies.get('spotify-token'))
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
