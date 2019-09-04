import { flowRight as compose } from 'lodash'

import { withRestrictedRoute } from '@lib/firebase/auth'

import withMeta from './withMeta'
import withLayout from './withLayout'
import withErrorHandling from './withErrorHandling'

export default function withPage(options = {}) {
  return function(Component) {
    const hocs = [
      withMeta,
      withRestrictedRoute(options.restricted),
      withLayout(options.layout),
      withErrorHandling,
    ]

    return compose(...hocs)(Component)
  }
}
