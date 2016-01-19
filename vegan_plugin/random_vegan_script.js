// References:
// https://github.com/razagill/tumblr-random-posts
// http://stackoverflow.com/questions/17095861/get-a-random-image-from-tumblr
// http://stackoverflow.com/questions/20359918/run-javascript-function-70-of-the-time-randomly-selected-from-an-array-of-func

// try/catch to prevent crashes if something breaks in the future
try{
    // call main function with a probability of 0.2
    var probability = 20;

    function randomVeganImage() {

        var apiKey = 'jnoUl9suQsp3WkDEF5MwKyqkbwnw9pSDmRUjAbv7ZmIyGs5UqH',
            link = "https://api.tumblr.com/v2/blog/vegansidekick.tumblr.com/posts?",
            minLength = 200,
            highestLength = 0,
            chosenP;

        // check each paragraph tag and choose the longest one
        $('p').each(function() {
            var $this = $(this);
            var curlength = $(this).text().length;
            if (curlength > minLength && curlength > highestLength) {
                highestLength = curlength;
                chosenP = $this;
            }
        });
        // continue only if a suitable target paragraph tag is found
        if (chosenP) {
            $.ajax({
                type: "GET",
                url: link,
                dataType: "json",
                data: {
                    limit: '1',
                    api_key: apiKey
                }
            }).done(function(data) {
                $.ajax({
                    type: "GET",
                    url: link,
                    dataType: "json",
                    data: {
                        offset: random_number = Math.floor(Math.random() * data.response.total_posts),
                        limit: '1',
                        api_key: apiKey
                    }
                }).done(function(data) {
                    $.each(data.response.posts, function() {
                        var _photos = this.photos,
                            _url = this.post_url;

                        // since limit == 1 there should always be 1 photo in the array
                        if (_photos && _photos.length) {
                            var photo = _photos.pop(),
                                photoUrl;

                            if (photo.alt_sizes && photo.alt_sizes.length > 1 && photo.alt_sizes[1].height == 500) {
                                photoUrl = photo.alt_sizes[1].url;
                            } else {
                                photoUrl = photo.original_size.url;
                            }
                            chosenP.append("<div style='width: 100%; display: block; text-align: center;'><a style='display: inline-block; width: auto;' target='_blank' href='" + _url + "'><img style='display: inline; max-width: 400px; margin: 0; padding: 0; border: 0;'src='" + photoUrl + "'/></a></div>");
                        }
                    });
                });
            });
        }
    }

    if (Math.random() * 100 < probability) {
        randomVeganImage();
    }

} catch(e){
    console.log(e);
}