import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import * as AlbumService from '@features/album/data/services'

function HomePage({ token }) {
  return (
    <Flex flexWrap="wrap">
      <Box width={[1, 2 / 3]} pr={[0, 20]}>
        <Fetch service={() => AlbumService.getNewReleases({ token })}>
          {({ data }) => {
            console.log('data', data)
          }}
        </Fetch>
      </Box>

      <Box width={[1, 1 / 3]} pl={[0, 20]}>
        <div>Sidebar</div>
      </Box>
    </Flex>
  )
}

HomePage.getInitialProps = async () => {
  return {
    title: 'Home',
  }
}

export default withPage()(HomePage)
