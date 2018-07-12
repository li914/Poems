const Set=function(key,data){
  wx.setStorage({
    key: key,
    data: data,
  });
}
const setSync=function(key,data){
  try{
    wx.setStorageSync(key,data);
    return true;
  }catch(e){
    console.log(e);
    return false;
  }
}
const Get=function(obj){
  let key=obj.key||"";
  let success=obj.success||function(){}
  wx.getStorage({
    key: key,
    success: function(res) {
      success(res.data);
    },
  })
}
const GetSync=function(key){
  return wx.getStorageSync(key);
}
const remove=function(key){
  wx.removeStorage({
    key: key,
    success: function(res) {},
  })
}
const clear=function(){
  wx.clearStorage();
}
module.exports={
  set:Set,
  setSync:setSync,
  get:Get,
  getSync:GetSync,
  remove:remove,
  clear:clear
}