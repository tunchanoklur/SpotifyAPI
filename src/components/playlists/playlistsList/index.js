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
      <Fetch service={() => PlaylistsService.getFeaturedPlaylists({ token })}>
        {({ data }) => {
          console.log('data', data)
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

export default withPage()(PlaylistsPage)
