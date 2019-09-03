const routes = [
  {
    pattern: '/',
    name: 'home',
    page: 'index',
  },
  {
    pattern: '/article/:id',
    name: 'articleDetail',
    page: 'articleDetail',
  },
  {
    pattern: '/playlists',
    name: 'playlists',
    page: 'playlists',
  },
]

module.exports = routes
