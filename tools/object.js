const isEmptyObject = function(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

module.exports = {
  isEmptyObject: isEmptyObject,
}