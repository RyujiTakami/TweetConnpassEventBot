//スクリプトのプロバティを呼び出す
var API_KEY = PropertiesService.getScriptProperties().getProperties().API_KEY;
var API_SECRET = PropertiesService.getScriptProperties().getProperties().API_SECRET;

/* サービスの設定 */
function getService() {
  return OAuth1.createService('Twitter')
      .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
      .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
      .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
      .setConsumerKey(API_KEY)
      .setConsumerSecret(API_SECRET)
      .setCallbackFunction('authCallback')
      .setPropertyStore(PropertiesService.getUserProperties());
}

/* コールバック関数 */
function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) return HtmlService.createHtmlOutput('認証成功');
}

/* 認証リセット */
function reset() {
  getService().reset();
}

/* 認証用URL */
function getOAuthURL() {
  Logger.log(getService().authorize());
}

