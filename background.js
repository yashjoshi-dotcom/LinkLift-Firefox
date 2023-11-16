var array = ["medium.com"];
chrome.tabs.onUpdated.addListener(async (tabID, changeInfo, tab) => {
  if (tab.url && !tab.url.includes("webcache.googleusercontent.com")) {
    for (let i = 0; i < array.length; i++) {
    if (tab.url.includes(array[i])) {
      chrome.scripting.executeScript({ 
        target: { tabId: tabID },
        files: ['contentScript.js']
      }).then(() => {
        chrome.tabs.sendMessage(tabID, { type: "ArticleDetected" }, (response) => {
          if (response && response.isPremium === "true") {
            chrome.tabs.update(tabID, {
              url:
                "http://webcache.googleusercontent.com/search?q=cache:" +
                tab.url,
            });
          }
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  }
  }
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("hello.html") });
});
