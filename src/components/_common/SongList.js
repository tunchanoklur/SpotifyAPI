import React from 'react'
import { Flex } from '@rebass/grid/emotion'
import SongListItem from './SongListItem'

export function SongList({ tracks }) {
  return (
    <Flex
      flexWrap="wrap"
      width={1}
      css={{ backgroundColor: '#111', padding: '10px 0', borderRadius: '5px' }}>
      {tracks.map((track, i) => {
        return <SongListItem key={i} track={track.track} />
      })}
    </Flex>
  )
}
