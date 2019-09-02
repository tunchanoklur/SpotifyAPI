import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import Helmet from 'react-helmet'

class CustomHead extends Head {
  render() {
    const { head, styles } = this.context._documentProps

    return (
      <head {...this.props}>
        {head}
        {this.getCssLinks()}
        {styles || null}
        {this.props.children}
      </head>
    )
  }
}

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const documentProps = renderPage()
    const nextStyles = flush()

    return {
      ...documentProps,
      helmet: Helmet.renderStatic(),
      styles: null,
      nextStyles,
    }
  }

  render() {
    const { helmet } = this.props
    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    return (
      <html {...htmlAttrs}>
        <CustomHead>
          {helmet.title.toComponent()}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.meta.toComponent()}
          <link rel="shortcut icon" href={'/favicon.ico'} />
          {helmet.link.toComponent()}
          {this.props.nextStyles}
          {helmet.script.toComponent()}
        </CustomHead>
        <body {...bodyAttrs}>
          {helmet.noscript.toComponent()}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
