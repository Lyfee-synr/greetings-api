const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/data.json');
// This module provides utility functions to read and write data from/to a JSON file.

function readData() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
