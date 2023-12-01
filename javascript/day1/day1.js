const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const calibrationValues = []

rl.on('line', (consoleInput) => {
  if (consoleInput === 'end') {
    rl.close()
  } else {
		const nums = Array.from(consoleInput).filter(o => o.charCodeAt() >= 49 && o.charCodeAt() <= 57)
		const first = nums.shift()
		calibrationValues.push(`${first}${nums.length ? nums.pop() : first}`)
  }
}).on('close', () => {
	console.log('calibrationValues sum', calibrationValues.reduce((m, c) => m += Number(c), 0))
	process.exit(0);
});