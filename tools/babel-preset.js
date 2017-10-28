const BABEL_ENV = process.env.BABEL_ENV
const building = BABEL_ENV != undefined && BABEL_ENV !== 'cjs'

const plugins = [
  ["module-alias", [
    { "src": "./dist/umd/valjs.js", "expose": "valjs" }
  ]]
];

if (BABEL_ENV === 'umd') {
  plugins.push('transform-runtime');
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    'dev-expression'
  )
}

module.exports = {
  presets: [
    [ 'es2015', {
      modules: building ? false : 'commonjs'
    } ]
  ],
  plugins: plugins
}