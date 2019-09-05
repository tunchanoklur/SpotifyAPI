import React, { useContext } from 'react'
import { Flex } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import { userContext } from '@lib/auth'
import * as PlaylistsService from '@features/playlist/data/services'
import { DetailPageHeader } from '@components/_common/DetailPageHeader'
import { SongList } from '@components/_common/SongList'

function PlaylistsDetailPage({ id }) {
  const { token } = useContext(userContext)
  return (
    <Flex flexWrap="wrap">
      <Fetch service={() => PlaylistsService.getPlaylists({ token, id })}>
        {({ data }) => {
          console.log('data', data)
          return (
            <div>
              <DetailPageHeader data={data} />
              <br />
              <SongList tracks={data.tracks.items} />
            </div>
          )
        }}
      </Fetch>
    </Flex>
  )
}

PlaylistsDetailPage.getInitialProps = async ({ asPath, query }) => {
  return {
    id: query.id,
    breadcrumb: [
      {
        label: 'Playlists',
        route: {
          name: 'playlistsDetail',
          params: {
            id: query.id,
          },
        },
      },
    ],
  }
}

export default withPage({ restricted: true })(PlaylistsDetailPage)
