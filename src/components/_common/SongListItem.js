import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export function SongListItem({ track }) {
  return (
    <div
      css={{
        padding: '20px',
        display: 'flex',
        minWidth: '95%',
        borderStyle: 'outset',
      }}>
      <span
        css={{
          width: '5%',
        }}>
        <button
          css={{
            padding: '0 0 0 11px',
            marginRight: '10px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'thin solid currentColor',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
          }}>
          <Icon
            icon="play"
            css={{
              alignItems: 'center',
              display: 'flex',
              flex: '1 0 auto',
              justifyContent: 'inherit',
              lineHeight: 'normal',
              position: 'relative',
            }}
          />
        </button>
      </span>

      <span
        css={{
          width: '80%',
          alignSelf: 'center',
        }}>
        {track.name}
      </span>
      <span
        css={{
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
