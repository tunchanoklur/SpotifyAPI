import React, { useContext } from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import { userContext } from '@lib/page/withAuth'
import * as AlbumService from '@features/album/data/services'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Link } from '@router'

const loginButton = {
  display: 'inline-box',
  justifyContent: 'center',
  backgroundColor: '#5cbbf6 !important',
  borderColor: '#5cbbf6 !important',
  width: '100%',
  height: '300px',
  fontSize: '60px',
}
function HomePage() {
  const { token } = useContext(userContext)

  if (!token)
    return (
      <Link to="/api/login">
        <button css={loginButton}>
          <Icon icon="sign-in-alt" css={{ width: '60px', height: '60px' }} />
          Login
        </button>
      </Link>
    )

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
