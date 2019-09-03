import React from 'react'
import { Box } from '@rebass/grid/emotion'
import { Link } from '@router'

export function BoxInformation({ data, linkable = true, path }) {
  return (
    <Box width={1 / 5} px={10}>
      <article>
        <img src={data.images[0].url} />
        {linkable && path ? (
          <Link to={path} params={{ id: data.id }}>
            <a>{data.name}</a>
          </Link>
        ) : (
          <p>{data.name}</p>
        )}
      </article>
    </Box>
  )
}
