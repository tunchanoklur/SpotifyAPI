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
  {
    pattern: '/playlists/:id',
    name: 'playlistsDetail',
    page: 'playlistsDetail',
  },
]

module.exports = routes
