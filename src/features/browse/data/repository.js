import { fetchAPI } from '@lib/api'

export function getFeaturedPlaylists({ token }) {
  return fetchAPI({
    path: `/browse/featured-playlists/?country=TH&timestamp=${new Date().toISOString()}`,
    token,
  })
}
