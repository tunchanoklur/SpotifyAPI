import { fetchAPI } from '@lib/api'

export function getFeaturedPlaylists({ token }) {
  return fetchAPI({
    path: '/browse/featured-playlists/',
    token,
  })
}
