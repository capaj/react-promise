import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/react-promise.js',
  plugins: [babel()],
  targets: [
    {dest: 'dist/react-promise.cjs.js', format: 'cjs'},
    {dest: 'dist/react-promise.es.js', format: 'es'}
  ]
}
