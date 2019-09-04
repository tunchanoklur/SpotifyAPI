import * as API from './repository'

export function getFeaturedPlaylists({ token }) {
  return API.getFeaturedPlaylists({ token })
}
export function getPlaylists({ token, id }) {
  return API.getPlaylists({ token, id })
}
export function getMyPlaylists({ token }) {
  return API.getMyPlaylists({ token })
}
