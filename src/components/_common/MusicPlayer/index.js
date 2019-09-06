import React from 'react'
import ReactPlayer from 'react-player'
import { flowRight as compose } from 'lodash'
import { inject, observer } from 'mobx-react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import get from 'lodash/get'
import { css } from '@emotion/core'
import PlayQueue from './PlayQueue'

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
        height: MusicPlayerStore.showPlayQueue ? '50%' : 'unset',
      }}>
      <ReactPlayer
        ref={MusicPlayerStore.ref}
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
        onEnded={() => MusicPlayerStore.handleSongEnd()}
        onError={() => console.log('onError')}
        onProgress={info => MusicPlayerStore.handlePlayedTime(info)}
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
        {MusicPlayerStore.playingSong.name}
        <span
          css={css`
             {
              width: 30%;
              margin-left: 20px;
              justify-content: flex-end;
              position: relative;
            }
          `}>
          <progress
            css={css`
               {
                -webkit-appearance: none;
                appearance: none;
                justify-content: flex-end;
                width: 70%;
                position: absolute;
                z-index: -1;
                background-color: transparent;
                transition: width 0.1s ease;
                color: #d3d3d3;
                &::-webkit-progress-bar {
                  border-radius: 5px;
                }
                &::-webkit-progress-value {
                  background: #12813a;
                  padding-left: 20px;
                  border-radius: 5px;
                }
              }
            `}
            value={MusicPlayerStore.played}
            max={1}
          />
          <input
            css={css`
               {
                -webkit-appearance: none;
                width: 70%;
                height: 15px;
                outline: none;
                -webkit-transition: 0.2s;
                transition: opacity 0.2s;
                justify-content: flex-end;
                background: transparent;
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
            value={MusicPlayerStore.played}
            onMouseDown={e => MusicPlayerStore.handleSeekMouseDown(e)}
            onChange={e => MusicPlayerStore.handleSeekChange(e)}
            onMouseUp={e => MusicPlayerStore.handleSeekMouseUp(e)}
          />
          {MusicPlayerStore.playedDuration}
        </span>
        <span
          css={css`
             {
              width: 30%;
              margin-left: 20px;
              justify-content: center;
              position: relative;
            }
          `}>
          <button
            onClick={() => MusicPlayerStore.handlePrev()}
            css={css`
              margin-right: 10px;
              border: transparent;
              background-color: transparent;
              width: 30px;
              height: 30px;
              color: #d3d3d3;
              cursor: pointer;
            `}>
            <Icon
              icon="step-backward"
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
          <button
            onClick={() => MusicPlayerStore.handlePlayPause()}
            css={{
              backgroundColor: 'transparent',
              border: 'transparent',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              color: '#d3d3d3',
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
          <button
            onClick={() => MusicPlayerStore.handleNext()}
            css={css`
              margin-right: 10px;
              border: transparent;
              background-color: transparent;
              width: 30px;
              height: 30px;
              color: #d3d3d3;
              cursor: pointer;
            `}>
            <Icon
              icon="step-forward"
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
          css={css`
             {
              width: 5%;
              margin: auto;
              justify-content: flex-end;
              position: relative;
            }
          `}>
          <button
            onClick={() => MusicPlayerStore.handleMode()}
            css={css`
              margin-right: 10px;
              border: transparent;
              background-color: transparent;
              width: 30px;
              height: 30px;
              color: #d3d3d3;
              cursor: pointer;
            `}>
            <Icon
              icon={
                MusicPlayerStore.mode === 0
                  ? 'retweet'
                  : MusicPlayerStore.mode === 1
                  ? 'redo-alt'
                  : 'random'
              }
            />
          </button>
        </span>
        <span
          css={css`
             {
              width: 20%;
              margin: auto;
              justify-content: flex-end;
              position: relative;
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
                  background: #b2b0b0;
                  cursor: pointer;
                }

                &::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #b2b0b0;
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
        <span
          css={css`
             {
              width: 5%;
              margin: auto;
              justify-content: flex-end;
              position: relative;
            }
          `}>
          <button
            onClick={() => MusicPlayerStore.handleShowPlayQueue()}
            css={css`
              margin-right: 10px;
              border: transparent;
              background-color: transparent;
              width: 30px;
              height: 30px;
              color: #d3d3d3;
              cursor: pointer;
            `}>
            <Icon
              icon={MusicPlayerStore.showPlayQueue ? 'angle-down' : 'angle-up'}
            />
          </button>
        </span>
      </div>
      <PlayQueue tracks={MusicPlayerStore.playQueue} />
    </div>
  )
}

export default compose(
  inject('RootStore'),
  observer,
)(MusicPlayer)
