import { observable, action, computed } from 'mobx'
import { transformDuration } from '@components/_common/timeTransformer'

export default class MusicPlayerStore {
  @observable everPlay = false
  @observable playingSong = {}
  @observable playingSongIndex = -1
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
  @observable showPlayQueue = false
  @observable mode = 0 // 0 normal loop, 1 play same song, 2 random
  @observable ref = player => {
    this.player = player
  }

  @action
  setPlaying(songInfo) {
    const songIndex = this.findSongInQueue(songInfo)
    if (this.playingSongIndex !== -1 && songIndex === this.playingSongIndex) {
      this.handlePlayPause()
    } else {
      if (songIndex === -1) {
        this.addToQueue(songInfo)
        this.playingSongIndex = this.playQueue.length - 1
      } else {
        this.playingSongIndex = songIndex
      }
      this.playingSong = this.playQueue[this.playingSongIndex]
      this.setStart()
      this.playing = true
    }
    if (this.everPlay === false) {
      this.everPlay = true
    }
  }

  @action
  findSongInQueue(songInfo) {
    return this.playQueue.findIndex(track => {
      return track.id === songInfo.id
    })
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
    const songIndex = this.findSongInQueue(track)
    if (songIndex === -1) this.playQueue.push(track)
    else this.setPlaying(songIndex)
    console.log('PlayQueue', this.playQueue)
  }
  @action
  handlePlayPause() {
    this.playing = !this.playing
    console.log('playing: ', this.playing)
  }
  @action
  handleSongEnd() {
    this.handlePlayPause()
    if (this.mode === 0) {
      if (this.playingSongIndex === this.playQueue.length - 1) {
        this.setPlaying(this.playQueue[0])
      } else {
        this.setPlaying(this.playQueue[this.playingSongIndex + 1])
      }
    } else if (this.mode === 2 && this.playQueue.length !== 1) {
      let newIndex = this.playingSongIndex
      while (this.playingSongIndex === newIndex) {
        newIndex = getRandomInt(0, this.playQueue.length - 1)
      }
      this.setPlaying(this.playQueue[newIndex])
    }
  }
  @action
  handleMode() {
    if (this.mode === 0) {
      this.loop = true
      this.mode = 1
    } else if (this.mode === 1) {
      this.loop = false
      this.mode = 2
    } else if (this.mode === 2) this.mode = 0
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
  handleNext() {
    if (this.playingSongIndex === this.playQueue.length - 1)
      this.setPlaying(this.playQueue[0])
    else this.setPlaying(this.playQueue[this.playingSongIndex + 1])
  }
  @action
  handlePrev() {
    if (this.playingSongIndex === 0)
      this.setPlaying(this.playQueue[this.playQueue.length - 1])
    else this.setPlaying(this.playQueue[this.playingSongIndex - 1])
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
  @action
  handleShowPlayQueue() {
    this.showPlayQueue = !this.showPlayQueue
  }
  @computed
  get playedDuration() {
    return `  ${transformDuration(this.playedSec * 1000)}`
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
