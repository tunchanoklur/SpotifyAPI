import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { flowRight as compose } from 'lodash'
import { inject, observer } from 'mobx-react'
import { css } from '@emotion/core'

function SongListItem({ track, RootStore: { MusicPlayerStore } }) {
  return (
    <div
      css={{
        padding: '5px 20px',
        display: 'flex',
        minWidth: '95%',
        color: '#bbb',
      }}>
      <span
        css={{
          width: '5%',
        }}>
        <button
          disabled={!track.preview_url}
          onClick={() => MusicPlayerStore.setPlaying(track)}
          css={css`
            padding: 0 0 0 7px;
            margin-right: 10px;
            border-radius: 50%;
            background-color: transparent;
            border: thin solid currentColor;
            justify-content: center;
            width: 30px;
            height: 30px;
            color: #555;
            cursor: pointer;
            &:disabled {
              color: #262626;
              cursor: default;
            }
          `}>
          {track.id === MusicPlayerStore.playingSong.id &&
          MusicPlayerStore.playing ? (
            <Icon
              icon="pause"
              css={{
                alignItems: 'center',
                display: 'flex',
                flex: '1 0 auto',
                justifyContent: 'inherit',
                lineHeight: 'normal',
                position: 'relative',
              }}
            />
          ) : (
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
          )}
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
          alignSelf: 'center',
          fontSize: '0.8em',
          color: '#888',
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

export default compose(
  inject('RootStore'),
  observer,
)(SongListItem)
