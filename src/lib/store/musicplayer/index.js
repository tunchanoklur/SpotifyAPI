import { observable, action } from 'mobx'

export default class MusicPlayerStore {
  @observable everPlay = false
  @observable playingSong = {}
  @observable playQueue = []
  @observable playing = false
  @observable controls = false
  @observable volume = 0.5
  @observable muted = false
  @observable played = 0
  @observable loaded = 0
  @observable duration = 0
  @observable playbackRate = 1.0
  @observable loop = false

  @action
  setPlaying(songInfo) {
    if (this.everPlay === false) {
      this.everPlay = true
    }

    console.log('Play', songInfo)
    if (this.playingSong.id !== songInfo.id) {
      this.playingSong = songInfo
      this.playing = true
      this.setStart()
    } else {
      this.handlePlayPause()
    }
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
