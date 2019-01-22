const fs = require('fs');

module.exports = function readFile (path) {
    return new Promise((resolve) => {
        fs.readFile(path, 'utf8', (_, data) => {
            resolve(data);
        });
    });
}
