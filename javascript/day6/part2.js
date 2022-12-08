const { readFileSync } = require('node:fs')
const input = readFileSync('./input', {encoding: 'utf8'})
const NUMBER_OF_DISTINCT_CHARS_FOR_START_MESSAGE = 14

for(i = 0; i < input.length; i++) {
  if(new Set(input.slice(i, i + NUMBER_OF_DISTINCT_CHARS_FOR_START_MESSAGE)).size === NUMBER_OF_DISTINCT_CHARS_FOR_START_MESSAGE) {
    console.log('unique at ', i + NUMBER_OF_DISTINCT_CHARS_FOR_START_MESSAGE)
    break
  }
}