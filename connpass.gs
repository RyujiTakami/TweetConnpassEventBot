//コンパスから指定したグループの最新のEVENTを取得する
function getConnpassEvent() {
  var GROUP_ID = PropertiesService.getScriptProperties().getProperties().GROUP_ID;
  var query = '?series_id=' + GROUP_ID; //GROUPのID

  var respons = "https://connpass.com/api/v1/event/" + query;
  var options = 
    { 
      "method" : "get"
    };
  
  //リクエストデータを受け取る
  var JSON_response = UrlFetchApp.fetch(respons, options).getContentText();
  var data_event = JSON.parse( JSON_response );
  //Logger.log(data_event.events[0].started_at);
  return data_event.events[0]; //最新のイベント情報を取得
}


