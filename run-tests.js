require('babel-register')

const Mocha = require('mocha')
const glob = require('glob')
const mocha = new Mocha()
const jsdom = require('jsdom')
const { JSDOM } = jsdom

var exposedProperties = ['window', 'navigator', 'document']

global.document = new JSDOM('')
global.window = document.window
Object.keys(document.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.window[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}

glob('test/**/*.js', function (err, files) {
  var file, i, len
  if (err) {
    throw err
  }
  for (i = 0, len = files.length; i < len; i++) {
    file = files[i]
    mocha.addFile(file)
  }
  mocha.ui('bdd')
  return mocha.run(function (failures) {
    return process.exit(failures)
  })
})
