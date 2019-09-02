import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import App from 'next/app'
import { flowRight as compose } from 'lodash'

import { withFontLoader } from '@lib/font'
import { withUA } from '@lib/userAgent'
import withMobX from '@lib/store/withMobX'

import { GlobalStyles } from '@lib/styles'
import { CookiesProvider, withCookies } from 'react-cookie'

class MyApp extends App {
  render() {
    const { Component, router } = this.props

    if (!process.browser) {
      return (
        <Fragment>
          <GlobalStyles />
          <Helmet titleTemplate={`%s - nextweb.js`} />
          <Component {...this.props.pageProps} router={router} />
        </Fragment>
      )
    }

    return (
      <CookiesProvider>
        <GlobalStyles />
        <Helmet titleTemplate={`%s - nextweb.js`} />
        <Component {...this.props.pageProps} router={router} />
      </CookiesProvider>
    )
  }
}

export default compose(
  withUA,
  withMobX,
  withFontLoader,
  withCookies,
)(MyApp)
