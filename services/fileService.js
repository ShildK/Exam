const fs = require('fs/promises');

module.exports.readData = async (file) => {
    return JSON.parse(await fs.readFile(file, 'utf8', () => console.log('Read file')))
}

module.exports.writeData = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data), () => console.log('File writed'))
}