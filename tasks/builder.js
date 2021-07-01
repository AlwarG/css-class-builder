const {
  default: parser
} = require('posthtml-parser');
const fs = require('fs');
const getClassObj = require('./get-class-obj.js');
const generateStyles = require('./generate-styles');
const writeStyles = require('./write-styles');

module.exports = function builder({ filePath, tabSize }) {
  const givenHtml = fs.readFileSync(filePath, 'utf-8');
  let classObj = getClassObj(parser(givenHtml));
  let styleStr = generateStyles({ classObj, tabSize });
  writeStyles({
    styleStr,
    givenHtml,
    filePath
  });
};