import React, { useEffect, useContext } from 'react'
import { Router } from '@router'
import { userContext } from '@lib/page/withAuth'

export default (restricted = false) => PageComponent => {
  function EnhancedPageComponent(props) {
    const { token } = useContext(userContext)

    useEffect(() => {
      if (restricted && !token) {
        Router.pushRoute('/', {
          redirect: props.router.asPath,
        })
      }
    }, [restricted, token])

    return <PageComponent {...props} />
  }

  EnhancedPageComponent.getInitialProps = async function(ctx) {
    let pageProps = {}
    if (typeof PageComponent.getInitialProps === 'function') {
      pageProps = await PageComponent.getInitialProps(ctx)
    }
    return pageProps
  }

  return EnhancedPageComponent
}
