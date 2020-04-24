const apiKey = "jnoUl9suQsp3WkDEF5MwKyqkbwnw9pSDmRUjAbv7ZmIyGs5UqH",
  link = `https://api.tumblr.com/v2/blog/vegansidekick.tumblr.com/posts?api_key=${apiKey}`;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentScriptQuery === "fetch") {
    fetch(link + "&limit=1")
      .then((response) => response.json())
      .then((data) => {
        if (!data.response.total_posts) {
          sendResponse();
          return;
        }

        fetch(
          link +
            `&limit=1&offset=${Math.floor(
              Math.random() * data.response.total_posts
            )}`
        )
          .then((response) => response.json())
          .then((data) => {
            sendResponse(data);
          });
      })
      .catch((error) => console.error(error));
    return true;
  }
});
