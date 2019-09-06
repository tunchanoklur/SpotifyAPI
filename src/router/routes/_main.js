const routes = [
  {
    pattern: '/',
    name: 'home',
    page: 'index',
  },
  {
    pattern: '/album',
    name: 'album',
    page: 'album',
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
