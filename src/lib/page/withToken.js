import React from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

function findTokenInAsPath(asPath) {
  const parts = asPath.split('access_token=')

  if (parts.length === 2) {
    return parts[1].split('&token_type=')[0]
  }

  return false
}

export default function withToken(PageComponent) {
  function EnhancedPageComponent(props) {
    const { asPath } = useRouter()
    const [cookies, setCookie] = useCookies(['spotify-token'])

    const token = findTokenInAsPath(asPath)

    if (token) {
      setCookie('spotify-token', token)
    }

    const newProps = {
      ...props,
      token: cookies['spotify-token'],
    }

    return <PageComponent {...newProps} />
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
