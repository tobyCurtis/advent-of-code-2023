const { readFileSync } = require('node:fs')

const input = readFileSync('./input', {encoding: 'utf8'})

const letterToChoice = {
  'A': 'Rock',
  'B': 'Paper',
  'C': 'Scissors',
  'X': 'Rock',
  'Y': 'Paper',
  'Z': 'Scissors'
}

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

const points = []
input.split(/\n/).forEach(input => {
  points.push(figurePoints(...input.split(' ')))
})

console.log('points', points.reduce((sum, int) => sum += int, 0))

function figurePoints(oponentChoice, myChoice) {
  const opponentBeatsMe = opponentBeats[oponentChoice] === myChoice
  const tieGame = letterToChoice[oponentChoice] === letterToChoice[myChoice]
  let score = scores[myChoice]
  
  if(opponentBeatsMe) {
    return score
  } else if (tieGame) {
    return score + 3
  } else {
    return score + 6
  }
}

