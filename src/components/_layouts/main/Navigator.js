import React, { useContext } from 'react'
import { Link } from '@router'
import * as GTM from '@lib/stats/gtm'
import { userContext } from '@lib/firebase/auth'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Menu } from 'antd'

const mainMenus = [
  {
    name: 'Home',
    route: 'home',
    icon: 'home',
  },
  {
    name: 'About',
    route: 'about',
    icon: 'users',
  },
]

const trackEvent = menu => () => {
  GTM.logEvent({
    category: 'Navigation',
    action: 'Clicked',
    label: menu.name,
    dimension1: 'dimension1',
    dimension2: 'dimension2',
  })
}

function LinkItem({ menu, ...props }) {
  return (
    <Menu.Item>
      <a
        {...props}
        onClick={e => {
          props.onClick(e)
          trackEvent(menu)
        }}>
        <Icon icon={menu.icon} />
        {menu.name}
      </a>
    </Menu.Item>
  )
}

export default function Navigation() {
  const userData = useContext(userContext)
  return (
    <Menu mode="inline" style={{ width: 256, height: 1000 }}>
      {mainMenus.map(menu => (
        <Link key={menu.name} to={menu.route} passHref>
          <LinkItem menu={menu} />
        </Link>
      ))}
      {userData ? (
        <Link key="Account" to="account" passHref>
          <LinkItem menu={{ name: 'Account', icon: 'user' }} />
        </Link>
      ) : (
        <Link key="Login" to="login" passHref>
          <LinkItem menu={{ name: 'Login', icon: 'sign-in-alt' }} />
        </Link>
      )}
    </Menu>
  )
}
