import { observable, action } from 'mobx'
import get from 'lodash/get'

export default class MusicPlayerStore {
  @observable playingSong = {}
  playQueue = []
  playing = false
  controls = false
  volume = 0.8
  muted = false
  played = 0
  loaded = 0
  duration = 0
  playbackRate = 1.0
  loop = false

  @action
  setPlaying(songInfo) {
    console.log('Play', songInfo)
    this.playingSong = songInfo
    this.playing = true
    this.controls = true
    this.setStart()
  }

  @action
  setStart() {
    this.played = 0
  }
  @action
  handlePlayPause() {
    this.playing = !this.playing
    console.log('playing: ', this.playing)
  }
  @action
  handleLoop() {
    this.loop = !this.loop
  }
  @action
  handleVolume(e) {
    this.volume = parseFloat(e.target.value)
  }
  @action
  handleMuted() {
    this.muted = !this.muted
  }
  @action
  handlePlaybackRate(e) {
    this.playbackRate = parseFloat(e.target.value)
  }
  @action
  handleEnded() {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }
  @action
  setDuration(duration) {
    console.log('onDuration', duration)
    this.duration = duration
  }
}
