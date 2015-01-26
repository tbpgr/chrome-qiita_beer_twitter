$(function() {
  var invalidTwitterIds = ['i', 'settings', 'about', 'jobs', 'privacy', 'tos'];
  function clicked(tab) {

    if (m = tab.url.match(/^http(?:s)?:\/\/twitter\.com\/(\w+)/)) {
      redirectToQiita(tab, m[1]);
    } else if (m = tab.url.match(/^http(?:s)?:\/\/twitter\.com/)) {
      findUserName(tab);
    } else if (m = tab.url.match(/^http(?:s)?:\/\/qiita\.com\/(\w+)/)) {
      redirectToTwitter(tab, m[1]);
    } else {
      openPoemZapping();
    }
  }

  function findUserName(tab) {
    chrome.tabs.sendRequest(tab.id, {}, function(response) {
      redirectToQiita(tab, response.userName);
    });
  }

  function redirectToQiita(tab, userName) {
    if (userName && invalidTwitterIds.indexOf(userName) == -1) {
      chrome.tabs.update(tab.id, {url: "https://qiita.com/" + userName});
    }
  }

  function redirectToTwitter(tab, userName) {
    if (userName) {
      chrome.tabs.update(tab.id, {url: "https://twitter.com/" + userName});
    }
  }

  chrome.browserAction.onClicked.addListener(clicked);
});
