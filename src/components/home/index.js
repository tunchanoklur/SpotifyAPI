import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Box } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import * as AlbumService from '@features/album/data/services'

import { useCookies } from 'react-cookie'

function findTokenInAsPath(asPath) {
  const parts = asPath.split('access_token=')

  if (parts.length === 2) {
    return parts[1].split('&token_type=')[0]
  }

  return false
}

function HomePage() {
  const { asPath } = useRouter()
  const [cookies, setCookie] = useCookies(['spotify-token'])

  const token = findTokenInAsPath(asPath)

  if (token) {
    setCookie('spotify-token', token)
  }

  return (
    <Flex flexWrap="wrap">
      <Box width={[1, 2 / 3]} pr={[0, 20]}>
        <Fetch
          service={() =>
            AlbumService.getNewReleases({ token: cookies['spotify-token'] })
          }>
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
