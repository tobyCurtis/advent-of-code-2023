const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const elfPayloads = []
let currentElf = []

rl.on('line', (consoleInput) => {
  if (consoleInput === 'end') {
    elfPayloads.sort().reverse()
    rl.close()
  } else if (consoleInput === '') {
    tallyCurrentElfFoodWeightTotal()
  } else {
    addWeightToCurrentElf(consoleInput)
  }
}).on('close', () => {
  console.log('The largest amount of calories is', elfPayloads.slice(0, 3).reduce(sumReducer, 0))
  process.exit(0);
});

function tallyCurrentElfFoodWeightTotal() {
  elfPayloads.push(currentElf.reduce(sumReducer, 0))
  currentElf = []
}

function sumReducer(sumOfCalories, calorieCount) {
  return sumOfCalories += calorieCount
}

function addWeightToCurrentElf(weightOfFoodItem) {
  currentElf.push(Number(weightOfFoodItem))
}