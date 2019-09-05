import React, { useContext } from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import { Fetch } from '@lib/api'
import withPage from '@lib/page/withPage'
import { userContext } from '@lib/auth'
import * as AlbumService from '@features/album/data/services'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Link } from '@router'
import { getStatic } from '@lib/static'
const loginButton = {
  display: 'inline-box',
  justifyContent: 'center',
  backgroundColor: '#1ed761 !important',
  borderColor: '#1ed761 !important',
  width: '50%',
  height: '60px',
  borderRadius: '28px',
  fontSize: '35px',
  cursor: 'pointer',
  margin: 'auto',
}
const logoStyle = {
  display: 'block',
  paddingBottom: '30px',
  width: '60%',
  margin: 'auto',
}
function HomePage() {
  const { token } = useContext(userContext)

  if (!token) {
    return (
      <Flex flexWrap="wrap">
        <img
          css={logoStyle}
          src={getStatic('spotify/spotifyLogo.png')}
          alt={'SpotifyLogo'}
        />
        <Link to="/api/login">
          <button css={loginButton}>
            <Icon icon="sign-in-alt" css={{ width: '35px', height: '35px' }} />
            Login
          </button>
        </Link>
      </Flex>
    )
  }

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

export default withPage()(HomePage)
