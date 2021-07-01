const fs = require('fs');
module.exports = function getClassObj({
  styleStr,
  neededSpace,
  givenHtml,
  filePath
}) {
  let outputStr = givenHtml;

  if (outputStr.includes('<style is-from-builder>')) {
    // Removing the old styles
    let [firstEle, secondEle] = givenHtml.split('<style is-from-builder>');
    let endIndex = (secondEle.indexOf('</style>') || 0) + 8;

    if (secondEle[endIndex] === '\n') {
      // Removing the next line for style closing
      endIndex += 1;
    }
    outputStr = `${firstEle}${secondEle.slice(endIndex)}`
  }

  let htmlSections = outputStr.split('</head>');

  // Setting the initial space for style tag start
  let initialEle = htmlSections[0];
  let spaceCount = 0;

  for (let i = initialEle.length - 1; i > 0; i--) {
    if (initialEle[i] === ' ') {
      spaceCount += 1;
    } else {
      break;
    }
  }
  initialEle = initialEle.slice(0, initialEle.length - spaceCount);

  // Generating the reult html
  let resultHTML = `${initialEle}${neededSpace}<style is-from-builder>${styleStr}${neededSpace}</style>\n</head>${htmlSections[1]}`;

  fs.writeFileSync(filePath, resultHTML);
}