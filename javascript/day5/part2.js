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
  let blocksToGrab = objectRepresentation[source].splice(objectRepresentation[source].length - moveAmount, objectRepresentation[source].length) 
  objectRepresentation[destination].push(...blocksToGrab)
})


console.log(
  Object
  .keys(objectRepresentation)
  .sort()
  .reduce((topStacks, columnName) => {
    return topStacks += objectRepresentation[columnName][objectRepresentation[columnName].length - 1]
  },'')
)

