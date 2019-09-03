import React from 'react'
import { css, Global } from '@emotion/core'

const baseStyles = css`
  html,
  body {
    padding: 3rem 1rem;
    margin: 0;
    background: #cbebfe;
    min-height: 100%;
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
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
