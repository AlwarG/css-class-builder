const {
  aliases
} = require('../constants/aliases');
const aliasKeys = Object.keys(aliases);

module.exports = function getClassObj({
  classObj,
  tabSize,
  seperator
}) {
  let neededSpace = '';
  tabSize = tabSize || 2;

  for (let i = 0; i < tabSize; i++) {
    neededSpace = `${neededSpace} `;
  }

  if (Object.keys(classObj).length) {
    // Removing the duplicate classes
    let clsString = (Object.values(classObj) || []).join(' ');
    let clsArrs = [...new Set(clsString.split(' '))];
    let resultStr = '\n';

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

    let styleSpace = `${neededSpace}${neededSpace}`;

    clsArrs.forEach((className) => {
      let [style, prop] = className.split(seperator);
      style = getStyle(style);
      prop = getProp(prop);
      style = style.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      prop = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      resultStr = `${resultStr}${styleSpace}.${className} {\n${styleSpace}${neededSpace}${style}: ${prop};\n${styleSpace}}\n\n`;
    });
    return {
      neededSpace,
      resultStr
    };
  }
  return {
    resultStr: '',
    neededSpace
  };
};