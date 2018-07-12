const httpGet = function(obj) {
  let url = obj.url || "";
  let header = obj.header || {
    'content-type': 'application/json'
  };
  let dataType = obj.dataType || "json";
  let success = obj.success || function() {};
  let fail = obj.fail || function() {};
  if (url == "") {
    console.log("必须填访问网址！")
    return;
  }
  wx.request({
    url: url,
    header: header,
    method: "GET",
    success: function(res) {
      if (res.statusCode == 200) {
        success(res.data);
      } else {
        fail(res);
      }
    },
    fail: function(res) {
      fail(res);
    }
  })
}
const httpPost = function(obj) {
  let url = obj.url || "";
  let header = obj.header || {
    'content-type': 'application/json'
  };
  let dataType = obj.dataType || "json";
  let data = obj.data || {};
  let success = obj.success || function() {};
  let fail = obj.fail || function() {};
  if (url == "") {
    console.log("必须填访问网址！")
    return;
  }
  wx.request({
    url: url,
    data: data,
    method: "POST",
    header:header,
    success:function(res){
      if(res.statusCode==200){
        success(res.data);
      }else{
        fail(res);
      }
    },
    fail:function(res){
      fail(res);
    }
  })
}
module.exports = {
  get: httpGet,
  post: httpPost
}