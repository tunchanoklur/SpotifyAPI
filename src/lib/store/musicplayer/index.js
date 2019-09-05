import { observable, action, computed } from 'mobx'
import { transformDuration } from '@components/_common/timeTransformer'

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
  @observable playedSec = 0
  @observable loadedSec = 0
  @observable duration = 0
  @observable playbackRate = 1.0
  @observable loop = false
  @observable seeking = false

  @observable ref = player => {
    this.player = player
  }

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
    this.loaded = 0
    this.playedSec = 0
    this.loadedSec = 0
  }
  @action
  addToQueue(track) {
    this.playQueue.push(track)
    console.log(this.playQueue)
  }
  @action
  handlePlayPause() {
    this.playing = !this.playing
    console.log('playing: ', this.playing)
  }
  @action
  handleSongEnd() {
    this.handlePlayPause()
    if (this.playQueue.length !== 0) {
      this.setPlaying(this.playQueue[0])
    }
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
  @action
  handleSeekChange(e) {
    this.played = parseFloat(e.target.value)
  }
  @action
  handleSeekMouseDown(e) {
    this.seeking = true
  }
  @action
  handleSeekMouseUp(e) {
    this.seeking = false
    this.player.seekTo(parseFloat(e.target.value))
  }
  @action
  handlePlayedTime(info) {
    this.loaded = info.loaded
    this.loadedSec = info.loadedSeconds
    this.played = info.played
    this.playedSec = info.playedSeconds
  }

  @computed
  get playedDuration() {
    return `  ${transformDuration(this.playedSec * 1000)}`
  }
}
