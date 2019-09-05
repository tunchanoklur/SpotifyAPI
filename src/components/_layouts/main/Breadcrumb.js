import React, { Fragment } from 'react'
import { Link } from '@router'

const linkStyles = {
  display: 'inline-box',
  padding: 5,
}

export default function Breadcrumb({ data = [] }) {
  return (
    <nav css={{ fontSize: '0.8em', marginBottom: 30 }}>
      <Link key="Home" to="home">
        <a css={linkStyles}>Home</a>
      </Link>

      {data.map(({ label, route }) => (
        <Fragment key={label}>
          <span>&gt;</span>
          <Link to={route.name} params={route.params}>
            <a css={linkStyles}>{label}</a>
          </Link>
        </Fragment>
      ))}
    </nav>
  )
}
