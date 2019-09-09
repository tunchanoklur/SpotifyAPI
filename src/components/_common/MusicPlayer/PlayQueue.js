import React from 'react'
import { Flex } from '@rebass/grid/emotion'
import { inject, observer } from 'mobx-react'
import { flowRight as compose } from 'lodash'
import PlayQueueItem from './PlayQueueItem'

function PlayQueue({ tracks, RootStore: { MusicPlayerStore } }) {
  return (
    <Flex
      flexWrap="wrap"
      width={1}
      css={{
        backgroundColor: '#111',
        padding: '10px 0',
        borderRadius: '5px',
        display: MusicPlayerStore.showPlayQueue ? 'block' : 'none',
      }}>
      {tracks.map((track, i) => {
        return <PlayQueueItem key={i} track={track} />
      })}
    </Flex>
  )
}

export default compose(
  inject('RootStore'),
  observer,
)(PlayQueue)
