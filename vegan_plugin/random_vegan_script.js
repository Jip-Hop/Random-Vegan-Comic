// References:
// https://github.com/razagill/tumblr-random-posts
// http://stackoverflow.com/questions/17095861/get-a-random-image-from-tumblr
// http://stackoverflow.com/questions/20359918/run-javascript-function-70-of-the-time-randomly-selected-from-an-array-of-func

// try/catch to prevent crashes if something breaks in the future
try {
  // call main function with a probability of 0.2
  const probability = 20,
    minLength = 220;

  const randomVeganImage = () => {
    let chosenP,
      highestLength = 0;

    // check each paragraph tag and choose the longest one
    document.querySelectorAll("p").forEach((p) => {
      const curlength = p.innerText.length;
      if (curlength > minLength && curlength > highestLength) {
        highestLength = curlength;
        chosenP = p;
      }
    });
    // continue only if a suitable target paragraph tag is found
    if (chosenP) {
      chrome.runtime.sendMessage({ contentScriptQuery: "fetch" }, (data) => {
        if (chrome.runtime.lastError) {
          // Something went wrong
          console.warn(chrome.runtime.lastError.message);
          return;
        }

        data.response.posts.forEach((post) => {
          const photos = post.photos,
            url = post.post_url;

          // since limit == 1 there should always be 1 photo in the array
          if (photos && photos.length) {
            var photo = photos.pop(),
              photoUrl;

            if (
              photo.alt_sizes &&
              photo.alt_sizes.length > 1 &&
              photo.alt_sizes[1].height == 500
            ) {
              photoUrl = photo.alt_sizes[1].url;
            } else {
              photoUrl = photo.original_size.url;
            }

            const div = document.createElement("div");
            div.setAttribute(
              "style",
              "width: 100%; display: block; text-align: center;"
            );
            const a = document.createElement("a");
            a.href = url;
            a.setAttribute("style", "display: inline-block; width: auto;");
            a.setAttribute("target", "_blank");
            const img = document.createElement("img");
            img.setAttribute(
              "style",
              "display: inline; max-width: 400px; margin: 0; padding: 0; border: 0;"
            );
            img.src = photoUrl;

            a.appendChild(img);
            div.appendChild(a);
            chosenP.appendChild(div);
          }
        });
      });
    }
  };

  if (Math.random() * 100 < probability) {
    randomVeganImage();
  }
} catch (e) {
  console.warn(e);
}
