import React, { Component } from 'react'
import ReactPlayer from 'react-player'

export class MusicPlayer extends Component {
  render() {
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url="https://p.scdn.co/mp3-preview/fe0ac4051d936b57c793013e5fa342c3173af52a?cid=d57ab4103ced402191e4d0b305a3c241"
          controls
          playing
        />
      </div>
    )
  }
}
