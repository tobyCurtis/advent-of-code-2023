const { readFileSync } = require('node:fs')
const input = readFileSync('./input', { encoding: 'utf8' })

console.log(
    input
    .split('\n')
    .reduce((allBags, currentBag) => {
        const lastBag = allBags[allBags.length - 1]

        if (lastBag.length < 3) {
            lastBag.push(currentBag)
        } else {
            allBags.push([currentBag])
        }

        return allBags
    }, [[]])
    .map(([bag1, bag2, bag3]) => {
        const badge = findStringIntersection(findStringIntersection(bag1, bag2).join(''), findStringIntersection(bag2, bag3).join(''))[0]
        return getPriority(badge)
    })
    .reduce((prioritySum, singlePriority) => prioritySum += singlePriority, 0)
)

function findStringIntersection(firstString, secondString) {
    return [...new Set([].filter.call(firstString, (character) => secondString.includes(character)))]
}

function getPriority(character) {
    const charCode = character.charCodeAt(0)

    if (charCode > 96) {
        return charCode - 96
    } else {
        return charCode - 38
    }
}