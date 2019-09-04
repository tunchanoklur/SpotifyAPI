import React, { useContext } from 'react'
import { withCookies } from 'react-cookie'
import { Link } from '@router'
import { userContext, AUTH_COOKIE_NAME } from '@lib/page/withAuth'
import { media } from '@lib/styles'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const mainMenus = [
  {
    name: 'Home',
    route: 'home',
    icon: 'home',
  },
  {
    name: 'Playlists',
    route: 'playlists',
    icon: 'users',
  },
]

const linkStyles = {
  display: 'inline-box',
  padding: '5px 15px 10px 0px',
  marginRight: 10,
  cursor: 'pointer',
  [media('md')]: {
    fontSize: '1.2em',
  },
}

function Navigation({ cookies }) {
  const { token } = useContext(userContext)

  return (
    <nav css={{ marginBottom: 10, borderBottom: '1px solid #aaa' }}>
      {mainMenus.map(({ name, route, icon }) => (
        <Link key={name} to={route} passHref>
          <a css={linkStyles}>
            <Icon icon={icon} />
            {name}
          </a>
        </Link>
      ))}

      {token ? (
        <a
          css={linkStyles}
          onClick={() => {
            cookies.remove(AUTH_COOKIE_NAME)
            location.href = '/'
          }}>
          <Icon icon="sign-out-alt" />
          Logout
        </a>
      ) : null}
    </nav>
  )
}

export default withCookies(Navigation)
