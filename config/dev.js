import { resolve } from 'path'

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {},
  plugins: [
    resolve(__dirname, './plugins/minifyMainPackage')
  ]
}
