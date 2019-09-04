import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import App from 'next/app'
import { flowRight as compose } from 'lodash'

import { withFontLoader } from '@lib/font'
import { withUA } from '@lib/userAgent'
import { withAuth } from '@lib/auth'
import withMobX from '@lib/store/withMobX'

import { GlobalStyles } from '@lib/styles'
import { CookiesProvider } from 'react-cookie'
import MusicPlayer from '@components/_common/MusicPlayer'

class MyApp extends App {
  render() {
    const { Component, router } = this.props

    const children = (
      <Fragment>
        <GlobalStyles />
        <Helmet titleTemplate={`%s - nextweb.js`} />
        <Component {...this.props.pageProps} router={router} />
        <MusicPlayer />
      </Fragment>
    )

    if (process.browser) {
      return <CookiesProvider>{children}</CookiesProvider>
    }

    return children
  }
}

export default compose(
  withUA,
  withAuth,
  withMobX,
  withFontLoader,
)(MyApp)
