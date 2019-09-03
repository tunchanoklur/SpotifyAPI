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
]

function LinkItem({ menu, ...props }) {
  return (
    <a
      {...props}
      css={{
        display: 'inline-box',
        padding: '5px 15px 10px 0px',
        marginRight: 10,
        cursor: 'pointer',
        [media('md')]: {
          fontSize: '1.2em',
        },
      }}>
      <Icon icon={menu.icon} />
      {menu.name}
    </a>
  )
}

function Navigation({ cookies }) {
  const { token } = useContext(userContext)

  return (
    <nav css={{ marginBottom: 10, borderBottom: '1px solid #aaa' }}>
      {mainMenus.map(menu => (
        <Link key={menu.name} to={menu.route} passHref>
          <LinkItem menu={menu} />
        </Link>
      ))}

      {token ? (
        <LinkItem
          menu={{ name: 'Logout', icon: 'sign-out-alt' }}
          onClick={() => {
            cookies.remove(AUTH_COOKIE_NAME)
            location.href = '/'
          }}
        />
      ) : (
        <LinkItem
          menu={{ name: 'Login', icon: 'sign-in-alt' }}
          href="/api/login"
        />
      )}
    </nav>
  )
}

export default withCookies(Navigation)
