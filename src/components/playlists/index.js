import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import * as PlaylistsService from '@features/browse/data/services'

function PlaylistsPage({ token }) {
  return (
    <Flex flexWrap="wrap">
      <Fetch service={() => PlaylistsService.getFeaturedPlaylists({ token })}>
        {({ data }) => {
          console.log('data', data)
          return data.playlists.items.map(playlist => (
            <Box width={1 / 5} px={10} key={playlist.id}>
              <article>
                <img src={playlist.images[0].url} />
                <p>{playlist.name}</p>
              </article>
            </Box>
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
