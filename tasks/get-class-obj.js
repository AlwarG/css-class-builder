const seperator = '-';

module.exports = function getClassObj(htmlArr) {
  let classObject = {};
  // Setting the classes from the elements
  function setClasses(obj, givenIndex) {
    let classIndex = 1;
    let eleObjs = obj.filter((ele) => {
      return typeof ele === 'object' && ele !== null;
    });

    eleObjs.forEach((ele = {}) => {
      let myIndex = givenIndex ? `${givenIndex}.${classIndex}` : classIndex;
      let attrs = ele.attrs || {};
      if (attrs.class && attrs.class.includes(seperator)) {
        let seperatorClass = attrs.class.split(' ').filter((clsName) => clsName.includes(seperator)).sort().join(' ');
        classObject[`class-${myIndex}`] = seperatorClass;
        classIndex++;
      }
      if (ele.content) {
        setClasses(ele.content, myIndex);
      }
    });
    return eleObjs;
  };
  setClasses(htmlArr);
  return classObject;
}
