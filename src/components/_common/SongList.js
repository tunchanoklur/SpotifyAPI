import React from 'react'
import { Flex } from '@rebass/grid/emotion'
import SongListItem from './SongListItem'

export function SongList({ tracks }) {
  return (
    <Flex flexWrap="wrap" width={1} css={{ backgroundColor: 'white' }}>
      {tracks.map((track, i) => {
        return <SongListItem key={i} track={track.track} />
      })}
    </Flex>
  )
}
