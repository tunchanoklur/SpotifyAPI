import React from 'react'
import { css, Global } from '@emotion/core'

const baseStyles = css`
  html,
  body {
    padding: 20px;
    color: #888;
    margin: 0;
    background: #000;
    min-height: 100%;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
  }
  h1 {
    font-size: 1.3rem;
  }
  a {
    color: #888;
    text-decoration: none;
  }
  img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
`

export default function GlobalStyles() {
  return (
    <React.Fragment>
      <Global styles={baseStyles} />
    </React.Fragment>
  )
}
