import React from 'react'
import ReactPlayer from 'react-player'
import { flowRight as compose } from 'lodash'
import { inject, observer } from 'mobx-react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

function MusicPlayer({ RootStore: { MusicPlayerStore } }) {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
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
      <div css={{ width: '100%', backgroundColor: 'white' }}>
        <button
          onClick={() => MusicPlayerStore.handlePlayPause()}
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
      </div>
    </div>
  )
}

export default compose(
  inject('RootStore'),
  observer,
)(MusicPlayer)
