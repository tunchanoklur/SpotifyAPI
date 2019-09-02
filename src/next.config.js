require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const withFonts = require('next-fonts')
const withOffline = require('next-offline')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const compose = require('lodash/flowRight')

const nextConfig = {
  assetPrefix: process.env.ASSET_PREFIX,
  useFileSystemPublicRoutes: false,
  sassLoaderOptions: {
    outputStyle:
      process.env.NODE_ENV !== 'production' ? 'expanded' : 'compressed',
  },
  analyzeBrowser: process.env.BUNDLE_ANALYZE === 'browser',
  bundleAnalyzerConfig: {
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html',
    },
  },
  webpack: (config, { dev, isServer }) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(process.cwd(), '.env'),
        systemvars: true,
      }),
    ]

    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    if (dev && !isServer) {
      config.plugins.push(
        new CircularDependencyPlugin({
          exclude: /a\.js|node_modules/,
          failOnError: true,
          allowAsyncCycles: false,
          cwd: process.cwd(),
        }),
      )
    }

    if (!dev && !isServer) {
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()
        entries['main.js'].unshift('@babel/polyfill')
        return entries
      }
    }

    return config
  },
}

module.exports = compose(
  withCss,
  withSass,
  withFonts,
  withOffline,
  withBundleAnalyzer,
)(nextConfig)
