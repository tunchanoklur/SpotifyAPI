import React from 'react'
import ReactPlayer from 'react-player'
import { flowRight as compose } from 'lodash'
import { inject, observer } from 'mobx-react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import get from 'lodash/get'
import { css } from '@emotion/core'

function MusicPlayer({ RootStore: { MusicPlayerStore } }) {
  return (
    <div
      css={{
        display: MusicPlayerStore.everPlay ? 'block' : 'none',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        padding: '10px 20px',
        background: 'rgba(0, 0, 0, 80%)',
        borderTop: '1px solid #eee',
        color: '#aaa',
      }}>
      <ReactPlayer
        css={{ display: 'none' }}
        width="0%"
        height="0%"
        url={MusicPlayerStore.playingSong.preview_url}
        controls={false}
        playing={MusicPlayerStore.playing}
        loop={MusicPlayerStore.loop}
        playbackRate={MusicPlayerStore.playbackRate}
        volume={MusicPlayerStore.volume}
        muted={MusicPlayerStore.muted}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={() => console.log('onPlay')}
        onEnablePIP={() => console.log('onEnablePip')}
        onDisablePIP={() => console.log('onDisablePip')}
        onPause={() => console.log('onPause')}
        onBuffer={() => console.log('onBuffer')}
        onSeek={() => console.log('onSeek')}
        onEnded={() => MusicPlayerStore.handlePlayPause()}
        onError={() => console.log('onError')}
        onProgress={() => console.log('onProgress')}
        onDuration={() => console.log('onDuration')}
      />
      <div
        css={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          fontSize: '16px',
          flexWrap: 'wrap',
        }}>
        <img
          css={{
            marginRight: '10px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'thin solid currentColor',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            color: '#555',
            animation: 'imgRotate 15s linear infinite',
          }}
          src={get(MusicPlayerStore, 'playingSong.album.images[0].url', '')}
        />
        <button
          onClick={() => MusicPlayerStore.handlePlayPause()}
          css={{
            padding: '0 0 0 7px',
            marginRight: '10px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'thin solid currentColor',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
            color: '#555',
          }}>
          {MusicPlayerStore.playing ? (
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
        {MusicPlayerStore.playingSong.name}
        <span
          css={css`
             {
              width: 20%;
              margin: auto;
            }
          `}>
          <Icon
            icon={
              MusicPlayerStore.volume === 0
                ? 'volume-mute'
                : MusicPlayerStore.volume <= 0.75
                ? 'volume-down'
                : 'volume-up'
            }
            css={{ position: 'absolute', width: '30px' }}
          />
          <input
            css={css`
               {
                -webkit-appearance: none;
                margin-left: 25px;
                width: 50%;
                height: 15px;
                border-radius: 5px;
                background: #d3d3d3;
                outline: none;
                opacity: 0.7;
                -webkit-transition: 0.2s;
                transition: opacity 0.2s;
                justify-content: flex-end;
                &:hover {
                  opacity: 1;
                }

                &::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #1ed761;
                  cursor: pointer;
                }

                &::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #1ed761;
                  cursor: pointer;
                }
              }
            `}
            type="range"
            min={0}
            max={1}
            step="any"
            value={MusicPlayerStore.volume}
            onChange={e => MusicPlayerStore.handleVolume(e)}
          />
        </span>
      </div>
    </div>
  )
}

export default compose(
  inject('RootStore'),
  observer,
)(MusicPlayer)
