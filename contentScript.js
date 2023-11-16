(() => {
  console.log("Listener should be active now");
  browser.runtime.onMessage.addListener((obj) => {
    if (obj.type === "ArticleDetected") {
      var content = document.body.innerText;
      console.log(content);
      const array = [
        "Member-only story",
      ];
      for (var i = 0; i < array.length; i++) {
        var isPremium = content.indexOf(array[i]) !== -1;
        console.log(isPremium);
        if (isPremium) {
          return Promise.resolve({ isPremium: "true" });
        }
      }
      return Promise.reject({ isPremium: "true" });
    }
  });
})();
