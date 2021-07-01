const seperator = '-';
const { aliases } = require('../constants/aliases');
const aliasKeys = Object.keys(aliases);

module.exports = function getClassObj({
  classObj,
  tabSize
}) {
  // Removing the duplicate classes
  let clsString = (Object.values(classObj) || []).join(' ');
  let clsArrs = [...new Set(clsString.split(' '))];
  let resultStr = '\n';
  let neededSpace = '';
  tabSize = tabSize || 2;

  for (let i = 0; i < tabSize; i++) {
    neededSpace = `${neededSpace} `;
  }

  function getStyle(style) {
    if (aliasKeys.includes(style)) {
      // Setting the shortterm styles
      return aliases[style];
    }

    return style;
  }

  function getProp(prop) {
    if (prop.includes('percent')) {
      return prop.replace('percent', '%');
    }
    return prop
  }

  clsArrs.forEach((className) => {
    let [style, prop] = className.split(seperator);
    style = getStyle(style);
    prop = getProp(prop);
    style = style.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    prop = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    resultStr = `${resultStr}${neededSpace}.${className} {\n${neededSpace}${neededSpace}${style}: ${prop};\n${neededSpace}}\n\n`;
  });
  return resultStr;
};