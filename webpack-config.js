const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (cfg) => {
  cfg.devtool = 'source-map'
  cfg.module.rules.push({
    test: /\.mjs$/,
    type: 'javascript/auto'
  })

  // cfg.plugins.push(new CopyWebpackPlugin({
  //   patterns: [{ from: './public/*.json', to: './', force: true, flatten: true }]
  // }))

  cfg.plugins.push(new CopyWebpackPlugin(
    [{ from: './src/statics/*.json', to: './', force: true, flatten: true }],
    { copyUnmodified: true }
  ))

  cfg.module.rules.push({
    enforce: 'pre',
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    options: {
      formatter: require('eslint').CLIEngine.getFormatter('stylish'),
      fix: true
    }
  })

  cfg.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-plain-loader'
  })

  cfg.resolve.alias = {
    ...cfg.resolve.alias,
    '~': path.resolve(__dirname, 'src')
  }

  return cfg
}
