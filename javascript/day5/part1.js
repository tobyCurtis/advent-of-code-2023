const { readFileSync } = require('node:fs')
const input = readFileSync('./input', {encoding: 'utf8'})

let [stacks, instructions] = input.split('\n\n')
let reordered = stacks.split('\n').reverse()
let objectRepresentation = {}

let indexToColumnName = Array.from(reordered.shift()).reduce((indexToColumnName, columnName, index) => {
  if(columnName != ' ') {
    indexToColumnName[index] = columnName
    objectRepresentation[columnName] = []
  }
  return indexToColumnName
}, {})

reordered.forEach(row => {
  Array.from(row).forEach((character, index) => {
    if(indexToColumnName[index] && character != ' ') {
      objectRepresentation[indexToColumnName[index]].push(character)
    }
  })
})

instructions
.split('\n')
.forEach(movementString => {
  let [moveAmount, source, destination] = movementString.replace('move ', '').replace('from ', '').replace('to ', '').split(' ')
  for(let i = 0; i < moveAmount; i++) objectRepresentation[destination].push(objectRepresentation[source].pop())
})


console.log(Object.keys(objectRepresentation).sort().reduce((topStacks, columnName) => topStacks+=objectRepresentation[columnName][objectRepresentation[columnName].length - 1],''))

