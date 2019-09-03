import React, { Fragment } from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

import { FetchMore } from '@lib/api'
import withPage from '@lib/page/withPage'
import * as ArticleService from '@features/article/data/services'

import ArticleLatest, { ArticleList } from './ArticleLatest'
import { useCookies } from 'react-cookie'

function HomePage() {
  const [cookies] = useCookies(['spotify-token'])
  console.log('spotify-token', cookies)

  return (
    <Flex flexWrap="wrap">
      <Box width={[1, 2 / 3]} pr={[0, 20]}>
        {/* <ArticleLatest data={articleLatest} /> */}

        {/* <FetchMore
          service={({ start, limit }) =>
            ArticleService.getArticles({ start, limit })
          }
          start={5}
          limit={5}>
          {({ data, fetchMore, isLoading, isDone }) => {
            return (
              <Fragment>
                <ArticleList data={data} />

                {!isDone && (
                  <button onClick={fetchMore}>
                    {isLoading ? 'Loading...' : 'Load More'}
                  </button>
                )}
              </Fragment>
            )
          }}
        </FetchMore> */}
      </Box>

      <Box width={[1, 1 / 3]} pl={[0, 20]}>
        <div>Sidebar</div>
      </Box>
    </Flex>
  )
}

HomePage.getInitialProps = async () => {
  // const articleLatest = await ArticleService.getLatestArticles()

  return {
    title: 'Home',
    // articleLatest,
  }
}

export default withPage()(HomePage)
