import React from 'react'
import { Box } from '@rebass/grid/emotion'
import { Link } from '@router'

export function BoxInformation({ data, linkable = true, path }) {
  return (
    <Box width={1 / 5} px={10} py={10}>
      <article>
        <Link to={path} params={{ id: data.id }}>
          <a>
            <img src={data.images[0].url} />
          </a>
        </Link>
        <h3 css={{ fontSize: '1rem', marginTop: '5px' }}>
          {linkable && path ? (
            <Link to={path} params={{ id: data.id }}>
              <a>{data.name}</a>
            </Link>
          ) : (
            <p>{data.name}</p>
          )}
        </h3>
      </article>
    </Box>
  )
}
