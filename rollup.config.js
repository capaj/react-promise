import babel from 'rollup-plugin-babel'

export default {
  input: 'src/react-promise.js',
  plugins: [babel()],
  output: [
    { file: 'dist/react-promise.cjs.js', format: 'cjs' },
    { file: 'dist/react-promise.es.js', format: 'es' }
  ]
}
