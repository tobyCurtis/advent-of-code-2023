const { readFileSync } = require('node:fs')
const input = readFileSync('./input', {encoding: 'utf8'})

console.log(
  input
  .split('\n')
  .map(elfAssignmentPair => {
    let [elf1Assignment, elf2Assignment] = elfAssignmentPair.split(',')
    return [expandElfAssignment(...elf1Assignment.split('-')), expandElfAssignment(...elf2Assignment.split('-'))]
  })
  .reduce((total, [elf1Assignment, elf2Assignment]) => {
    return total += oneArrayContainsOtherCompletely(elf1Assignment, elf2Assignment)
  }, 0)
)

function expandElfAssignment(startingNumber, endingNumber) {
  let expandedPair = []

  if(startingNumber === endingNumber) {
    expandedPair = [startingNumber]
  } else {
    for(let i = Number(startingNumber); i <= Number(endingNumber); i++) {
      expandedPair.push(String(i))
    }
  }

  return expandedPair
}

function oneArrayContainsOtherCompletely(arr1, arr2) {
  return arr1.every(element => arr2.includes(element)) || arr2.every(element => arr1.includes(element))
}