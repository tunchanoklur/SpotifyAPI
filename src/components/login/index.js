import React from 'react'
import { Flex } from '@rebass/grid/emotion'

import withPage from '@lib/page/withPage'
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
function LoginPage() {
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

LoginPage.getInitialProps = async () => {
  return {
    title: 'Login',
  }
}

export default withPage({ layout: false })(LoginPage)
