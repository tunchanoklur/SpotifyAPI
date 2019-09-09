import React, { useContext } from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import { userContext } from '@lib/auth'
import * as AlbumService from '@features/album/data/services'

function HomePage() {
  const { token } = useContext(userContext)

  return (
    <Flex flexWrap="wrap">
      <Fetch service={() => AlbumService.getNewReleases({ token })}>
        {({ data }) =>
          data.albums.items.map(album => (
            <Box width={1 / 5} px={10} py={10} key={album.id}>
              <article>
                <img src={album.images[0].url} />
                <h3 css={{ fontSize: '1rem', marginTop: '5px' }}>
                  {album.name}
                </h3>
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

export default withPage({ restricted: true })(HomePage)
