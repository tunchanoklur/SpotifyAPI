import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

export const AUTH_COOKIE_NAME = 'spotify-token'
export const EXP_COOKIE_NAME = 'spotify-token-expire'
export const userContext = React.createContext(null)

function findTokenInAsPath(asPath) {
  const parts = asPath.split('access_token=')

  if (parts.length === 2) {
    return parts[1].split('&token_type=')[0]
  }

  return false
}

export default function withAuth(PageComponent) {
  function EnhancedPageComponent(props) {
    const [token, setToken] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies([AUTH_COOKIE_NAME])
    const { asPath } = useRouter()

    useEffect(() => {
      let token = cookies[AUTH_COOKIE_NAME]

      if (!token) {
        const tokenFromHash = findTokenInAsPath(asPath)

        if (tokenFromHash) {
          setCookie(AUTH_COOKIE_NAME, tokenFromHash, { maxAge: 60 * 60 })
          setTimeout(function() {
            removeCookie(AUTH_COOKIE_NAME)
            window.location.href = process.env.REDIRECT_URI
          }, 60 * 60 * 1000)
        }

        token = tokenFromHash
      }

      if (token !== false) {
        history.pushState({}, '', '/')
      }

      setToken(token || false)
    }, [asPath])

    const userData = {
      token,
    }

    return (
      <userContext.Provider value={userData}>
        <PageComponent {...props} />
      </userContext.Provider>
    )
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
