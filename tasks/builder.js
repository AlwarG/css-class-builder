const {
  default: parser
} = require('posthtml-parser');
const fs = require('fs');
const getClassObj = require('./get-class-obj.js');
const generateStyles = require('./generate-styles');
const writeStyles = require('./write-styles');

module.exports = function builder({ filePath, tabSize, seperator }) {
  const givenHtml = fs.readFileSync(filePath, 'utf-8');
  let classObj = getClassObj({ htmlArr: parser(givenHtml),  seperator });
  let { neededSpace, resultStr }= generateStyles({ classObj, tabSize, seperator });
  writeStyles({
    styleStr: resultStr,
    neededSpace,
    givenHtml,
    filePath
  });
};