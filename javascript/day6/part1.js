const { readFileSync } = require('node:fs')
const input = readFileSync('./input', {encoding: 'utf8'})

for(i = 0; i < input.length; i++) {
  if(new Set(input.slice(i, i +4)).size === 4) {
    console.log('unique at ', i + 4)
    break
  }
}