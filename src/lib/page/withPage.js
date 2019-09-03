import { flowRight as compose } from 'lodash'

import { withRestrictedRoute } from '@lib/firebase/auth'

import withMeta from './withMeta'
import withLayout from './withLayout'
import withAuth from './withAuth'
import withErrorHandling from './withErrorHandling'

export default function withPage(options = {}) {
  return function(Component) {
    const hocs = [
      withMeta,
      withAuth,
      withRestrictedRoute(options.restricted),
      withLayout(options.layout),
      withErrorHandling,
    ]

    return compose(...hocs)(Component)
  }
}
