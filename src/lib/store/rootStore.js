import { configure } from 'mobx'
import UIStore from './ui'
import ErrorStore from './error'
import MusicPlayerStore from './musicplayer'

configure({ enforceActions: 'observed' })

export default class RootStore {
  constructor() {
    this.uiStore = new UIStore(this)
    this.errorStore = new ErrorStore(this)
    this.MusicPlayerStore = new MusicPlayerStore(this)
  }
}
