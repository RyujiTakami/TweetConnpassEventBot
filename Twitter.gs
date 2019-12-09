//最新のコンパスのイベントをツイートする
function postTwitterConnpassEvent() {
  var event = getConnpassEvent();
  var event_date = event.started_at.split('T')[0];
  var event_start_time = event.started_at.split('T')[1].split('+')[0];
  var event_end_time = event.ended_at.split('T')[1].split('+')[0];
  var today_date = Utilities.formatDate(new Date(),"JST","yyyy-MM-dd");
  var today_time = Utilities.formatDate(new Date(),"JST","HH:mm:ss");
  
  if (event_date > today_date) {
    postTweet(event, event_date, event_start_time, event_end_time);
  } else if(event_date == today_date && event_start_time > today_time ) {
    postTweet(event, event_date, event_start_time, event_end_time);
  } else {
    return;
  }
}


//ツイートするデータを加工
function tweetData(event,date, start_time, end_time){
  var event_year = date.split('-')[0];
  var event_month = date.split('-')[1];
  var event_day = date.split('-')[2];
  var event_start_hour = start_time.split(':')[0];
  var event_start_min = start_time.split(':')[1];
  var event_end_hour = end_time.split(':')[0];
  var event_end_min = end_time.split(':')[1];
  var event_title = event.title;
  var text = '✅ 途中入退室自由' + '\n'
  text += '✅ ゆる〜く参加したい人向け' + '\n'
  text += '✅ もくもく会で育てるサイト企画進行中！' + '\n'
  var event_hash_tag = '#' + event.hash_tag + ' #駆け出しエンジニアと繋がりたい';
  var event_url = event.event_url;
  var postData = event_title + '\n';
  postData += '開催日時：'
  + event_year+ '年'
  + event_month + '月'
  + event_day + '日' +　' '
  + event_start_hour + '時'
  + event_start_min + '分 から '
  + event_end_hour + '時'
  + event_end_min + '分まで' + '\n\n';
  postData += text + '\n';
  postData += event_hash_tag + '\n';
  postData += '↓詳しくはこちら↓' + '\n';
  postData += event_url
  //Logger.log(postData);
  return postData;
}

//ツイートする
function postTweet(event, date, start_time, end_time) {
  var service = getService();
  if (service.hasAccess()) {
    var url = 'https://api.twitter.com/1.1/statuses/update.json';
    var payload = {
      status: tweetData(event, date, start_time, end_time)
    };
    var options = {
      method: 'post',
      payload: payload,
      escaping: false
    };
    var response = service.fetch(url, options);
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
    return result;
  }
}


