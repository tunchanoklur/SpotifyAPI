import React from 'react'
import ReactPlayer from 'react-player'
import { flowRight as compose } from 'lodash'
import { inject, observer } from 'mobx-react'

function MusicPlayer({ RootStore: { MusicPlayerStore } }) {
  const {
    loop,
    muted,
    playbackRate,
    volume,
    playing,
    playingSong,
  } = MusicPlayerStore
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={playingSong.preview_url}
        controls
        playing={playing}
        loop={loop}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
      />
    </div>
  )
}

export default compose(
  inject('RootStore'),
  observer,
)(MusicPlayer)
