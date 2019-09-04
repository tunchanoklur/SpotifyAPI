import React, { useContext } from 'react'
import { Flex } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import { userContext } from '@lib/page/withAuth'
import * as PlaylistsService from '@features/playlist/data/services'
import { BoxInformation } from '@components/_common/BoxInformation'

function PlaylistsPage() {
  const { token } = useContext(userContext)
  return (
    <Flex flexWrap="wrap">
      <h1 css={{ width: '100%' }}>My playlist</h1>
      <Fetch service={() => PlaylistsService.getMyPlaylists({ token })}>
        {({ data }) => {
          console.log('MyPlaylist', data)
          if (data.items.length > 0)
            return data.items.map(playlist => (
              <BoxInformation
                key={playlist.id}
                data={playlist}
                path={'playlistsDetail'}
              />
            ))
          else return <div>No playlist found</div>
        }}
      </Fetch>
      <hr />
      <Fetch service={() => PlaylistsService.getFeaturedPlaylists({ token })}>
        {({ data }) => {
          console.log('FeaturedPlaylist', data)
          return data.playlists.items.map(playlist => (
            <BoxInformation
              key={playlist.id}
              data={playlist}
              path={'playlistsDetail'}
            />
          ))
        }}
      </Fetch>
    </Flex>
  )
}

PlaylistsPage.getInitialProps = async function() {
  return {
    breadcrumb: [
      {
        label: 'Playlists',
        route: {
          name: 'playlists',
        },
      },
    ],
  }
}

export default withPage({ restricted: true })(PlaylistsPage)
