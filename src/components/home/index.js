import React, { useContext } from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import { userContext } from '@lib/page/withAuth'
import * as AlbumService from '@features/album/data/services'

function HomePage() {
  const { token } = useContext(userContext)

  return (
    <Flex flexWrap="wrap">
      <Fetch service={() => AlbumService.getNewReleases({ token })}>
        {({ data }) =>
          data.albums.items.map(album => (
            <Box width={1 / 5} px={10} key={album.id}>
              <article>
                <img src={album.images[0].url} />
                <p>{album.name}</p>
              </article>
            </Box>
          ))
        }
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
