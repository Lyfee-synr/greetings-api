const fs = require('fs');
const filePath = './data/data.json';

function readData() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
