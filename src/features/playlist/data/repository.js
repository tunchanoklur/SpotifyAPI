import { fetchAPI } from '@lib/api'

export function getFeaturedPlaylists({ token }) {
  return fetchAPI({
    path: `/browse/featured-playlists/?country=TH&timestamp=${new Date()
      .toISOString()
      .slice(0, -5)}`,
    token,
  })
}

export function getPlaylists(props) {
  return fetchAPI({
    path: `/playlists/${props.id}`,
    token: props.token,
  })
}

export function getMyPlaylists(props) {
  return fetchAPI({
    path: `/me/playlists`,
    token: props.token,
  })
}
