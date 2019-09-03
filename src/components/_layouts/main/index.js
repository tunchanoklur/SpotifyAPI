import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import Notifications from './Notifications'
import Navigation from './Navigation'
import Breadcrumb from './Breadcrumb'
import Header from './Header'
import Navigator from './Navigator'

import { breakpoints, Responsive, Adaptive } from '@lib/styles'

const theme = {
  breakpoints: Object.keys(breakpoints).map(key => breakpoints[key]),
}

export default function MainLayout({ children, breadcrumb }) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Navigator />
        {/* <Notifications />
        <Navigation /> */}
        {/* <Responsive
          breakpoint="md"
          narrow={null}
          wide={<Breadcrumb data={breadcrumb} />}
        /> */}
        <Adaptive narrow={null} wide={<Breadcrumb data={breadcrumb} />} />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  )
}
