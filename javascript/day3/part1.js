const { readFileSync } = require('node:fs')
const input = readFileSync('./input', {encoding: 'utf8'})

console.log(
  input
  .split('\n')
  .map(line => [line.substring(0, .5*line.length), line.substring(.5*line.length, line.length)])
  .reduce((totalPriority, [firstCompartment, secondCompartment]) => {
    let common = [].filter.call(firstCompartment, (character) => secondCompartment.includes(character))
    if(common.length) return totalPriority +=  getPriority(common[0])
    else return totalPriority
  }, 0)
)
  

function getPriority(character) {
  const charCode = character.charCodeAt(0)

  if(charCode > 96) {
    return charCode - 96
  } else {
    return charCode - 38
  }
}