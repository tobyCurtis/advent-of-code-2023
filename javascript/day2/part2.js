const { readFileSync } = require('node:fs')

const input = readFileSync('./input', {encoding: 'utf8'})

const scores = {
  'A': 1,
  'B': 2,
  'C': 3,
  'X': 1,
  'Y': 2,
  'Z': 3
}

const opponentBeats = {
  'A': 'Z',
  'B': 'X',
  'C': 'Y'
}

const myChoiceBeats = {
  'C': 'X',
  'A': 'Y',
  'B': 'Z'
}

const result = {
  LOSE: 'X',
  DRAW: 'Y',
  WIN: 'Z'
}

const equivalentChoice = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z'
}

const points = []
input.split(/\n/).forEach(input => {
  points.push(figurePoints(...input.split(' ')))
})

console.log('points', points.reduce((sum, int) => sum += int, 0))

function figurePoints(oponentChoice, outcome) {
  if(result.LOSE === outcome) {
    let myChoice = opponentBeats[oponentChoice]
    
    return scores[myChoice]
  } else if (result.DRAW === outcome) {
    let myChoice = equivalentChoice[oponentChoice]

    return scores[myChoice] + 3
  } else if(result.WIN === outcome) {
    let myChoice = myChoiceBeats[oponentChoice]

    return scores[myChoice] + 6
  }
}

