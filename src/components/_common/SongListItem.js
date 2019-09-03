import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export function SongListItem({ track }) {
  return (
    <div
      css={{
        padding: '20px',
        display: 'block',
        minWidth: '95%',
        borderStyle: 'outset',
      }}>
      <span
        css={{
          display: 'inline-block',
          width: '5%',
        }}>
        <Icon icon="play" />
      </span>
      <span
        css={{
          display: 'inline-block',
          width: '80%',
        }}>
        {track.name}
      </span>
      <span
        css={{
          display: 'inline-block',
          width: '15%',
        }}>
        {transformDuration(track.duration_ms)}
      </span>
    </div>
  )
}

function transformDuration(ms) {
  ms /= 1000
  ms = Math.round(ms)
  const m = Math.round(ms / 60)
  const s = ms % 60
  return `${m <= 9 ? '0' : ''}${m}:${s <= 9 ? '0' : ''}${s}`
}
