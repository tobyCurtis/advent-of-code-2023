const { readFileSync } = require('node:fs')
const input = readFileSync('./input', {encoding: 'utf8'})

let fileSystem = {
  '/': {}
}

let currentFolder = fileSystem
let parentFolder = ''
input.split('\n')
.forEach(command => {
  let commandParts = command.split(' ')

  if(commandParts[0] === '$' && commandParts[1] === 'cd' && commandParts[2] === '..') {
    currentFolder = currentFolder.parent
    parentFolder = currentFolder.parent
  } else if(commandParts[0] === '$' && commandParts[1] === 'cd') {
    parentFolder = currentFolder
    currentFolder = currentFolder[commandParts[2]]
  } else if (commandParts[0] === 'dir') {
    currentFolder[commandParts[1]] = {parent: currentFolder}
  } else if (!isNaN(commandParts[0])) {
    currentFolder[commandParts[1]] = Number(commandParts[0])
  }
})

let allDirectories = {}
getSizeOfDirectory(fileSystem['/'], '/')
function getSizeOfDirectory(directory, dirName) {
  let size = 0

  Object.keys(directory).forEach(key => {
    if(!isNaN(directory[key])) {
      size += directory[key]
    } else if (key !== 'parent') {
      size += getSizeOfDirectory(directory[key], key)
    }
  })
  
  
  if(allDirectories[dirName]) {
    allDirectories[dirName + ':rand' + Math.trunc(Math.random() * 100)] = size
  } else {
    allDirectories[dirName] = size
  }
  return size
}

console.log(Object.values(allDirectories).filter(size => size <= 100000).reduce((sum, size) => sum += size, 0))