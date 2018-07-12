/**
 * ms boolean值 当false时返回当天零时的毫秒时间戳
 * 不填或ms=true时，返回当天零时的秒时间戳
 * 
 * 
 */
const zero = function (ms) {
  if (typeof ms != "undefined" && typeof ms != "boolean") {
    return;
  }
  ms = ms == undefined || ms == true ? true : false;
  let s = ms ? 1000 : 1;
  s = new Date(new Date().setHours(0, 0, 0, 0)) / s;
  return s;
}
/**
 *  * ms boolean值 当false时返回现在的毫秒时间戳
 * 不填或ms=true时，返回现在的秒时间戳
 */
const timestamp = function (ms) {
  if (typeof ms != "undefined" && typeof ms != "boolean") {
    return;
  }
  ms = ms == undefined || ms == true ? true : false;
  let s = ms ? 1000 : 1;
  s = new Date().getTime() / s;
  return parseInt(s);
}
module.exports = {
  zero: zero,
  timestamp: timestamp,
}