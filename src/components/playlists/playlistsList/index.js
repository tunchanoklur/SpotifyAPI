import React, { useContext } from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import { userContext } from '@lib/auth'
import * as PlaylistsService from '@features/playlist/data/services'
import { BoxInformation } from '@components/_common/BoxInformation'

function PlaylistsPage() {
  const { token } = useContext(userContext)

  if (!token) return null

  return (
    <Flex flexWrap="wrap">
      <Box width={1}>
        <h1 css={{ width: '100%' }}>My playlist</h1>
        <Flex flexWrap="wrap" css={{ margin: '0 -10px' }}>
          <Fetch service={() => PlaylistsService.getMyPlaylists({ token })}>
            {({ data }) => {
              console.log('MyPlaylist', data)
              if (data.items.length > 0) {
                return data.items.map(playlist => (
                  <BoxInformation
                    key={playlist.id}
                    data={playlist}
                    path={'playlistsDetail'}
                  />
                ))
              } else {
                return <div>No playlist found</div>
              }
            }}
          </Fetch>
        </Flex>
      </Box>

      <Box width={1} py={40}>
        <h1 css={{ marginTop: '20px' }}>Recommended Playlists</h1>
        <Flex flexWrap="wrap" css={{ margin: '0 -10px' }}>
          <Fetch
            service={() => PlaylistsService.getFeaturedPlaylists({ token })}>
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
      </Box>
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
