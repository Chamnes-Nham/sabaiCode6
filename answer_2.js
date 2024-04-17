const fs = require('fs').promises;

function readFileAsync(filePath) {
  return fs.readFile(filePath, 'utf-8');
}

function writeFileAsync(filePath, data) {
  return fs.writeFile(filePath, data);
}

readFileAsync('input.txt')
  .then(data => {

    const modifiedData = data + "First modification\n";
    return writeFileAsync('output1.txt', modifiedData);
  })
  .then(() => {
    
    return readFileAsync('output1.txt');
  })
  .then(data => {
    const modifiedData = data + "Second modification\n";
    return writeFileAsync('output2.txt', modifiedData);
  })
  .then(() => {
 
    return readFileAsync('output2.txt');
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });
