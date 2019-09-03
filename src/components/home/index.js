import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import * as AlbumService from '@features/album/data/services'

function HomePage({ token }) {
  return (
    <Flex flexWrap="wrap">
      <Fetch service={() => AlbumService.getNewReleases({ token })}>
        {({ data }) => {
          console.log('data', data)
          return data.albums.items.map(album => (
            <Box width={1 / 5} px={10} key={album.id}>
              <article>
                <img src={album.images[0].url} />
                <p>{album.name}</p>
              </article>
            </Box>
          ))
        }}
      </Fetch>
    </Flex>
  )
}

HomePage.getInitialProps = async () => {
  return {
    title: 'Home',
  }
}

export default withPage()(HomePage)
