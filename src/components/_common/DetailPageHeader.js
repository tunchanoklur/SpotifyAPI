import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

export function DetailPageHeader({ data }) {
  return (
    <Flex
      flexWrap="wrap"
      width={1}
      css={{ backgroundColor: '#111', borderRadius: '5px' }}>
      <Box width={1 / 3} px={10}>
        <article css={{ margin: '35px' }}>
          <img src={data.images[0].url} />
        </article>
      </Box>
      <Box width={1 / 2} px={10}>
        <article css={{ margin: '35px' }}>
          <div>
            <b>{data.name}</b>
          </div>
          <br />
          <div>{data.description}</div>
          <br />
          <div>{data.tracks.total} tracks</div>
        </article>
      </Box>
    </Flex>
  )
}
