const fs = require('fs')
const execSync = require('child_process').execSync
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  })

const isTest = process.env.NODE_ENV === 'test';


if(!isTest) {
  console.log('Building CommonJS modules ...');
  exec('babel src -d dist/cjs --ignore __tests__', {
    BABEL_ENV: 'cjs'
  })

  console.log('\nBuilding ES modules ...');

  exec('babel src -d dist/es --ignore __tests__', {
    BABEL_ENV: 'es'
  })
}


console.log('\nBuilding valjs.js ...')

exec('rollup -c -f umd -o dist/umd/valjs.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development'
})

if(isTest) {
  console.log('\nBuilding tester.js ...')
  exec('babel src/tester.js --out-file dist/tester.js', {
    BABEL_ENV: 'cjs'
  })
  console.log('\n\n\n');
}

if(!isTest) {
  console.log('\nBuilding valjs.min.js ...')

  exec('rollup -c -f umd -o dist/umd/valjs.min.js', {
    BABEL_ENV: 'umd',
    NODE_ENV: 'production'
  })

  const size = gzipSize.sync(
    fs.readFileSync('dist/umd/valjs.min.js')
  )

  console.log('\ngzipped, the UMD build is %s', prettyBytes(size))
}




