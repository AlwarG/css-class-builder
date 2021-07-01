const fs = require('fs');
module.exports = function getClassObj({
  styleStr,
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
  let resultHTML = `${htmlSections[0]}<style is-from-builder>${styleStr}</style>\n</head>${htmlSections[1]}`;

  fs.writeFileSync(filePath, resultHTML);
}
