function getMovieId_scrapping(name, year, callback) {
    var url = "http://m.imdb.com/find?ref_=nv_sr_fn&s=all&q=" + encodeURIComponent(name + " (" + year + ") ");
    console.log(url);

    $.ajax(url).done(function (data) {
        var link = $("<div>" + data + "</div>").find("section.posters > div.poster > div.label > div.title > a");
        callback($(link).attr("href"));
    });
}

function getMovieRating_scrapping(movieUrl, callback) {
    $.ajax("http://m.imdb.com" + movieUrl).done(function (data) {
        var span = $("<div>" + data + "</div>").find("#ratings-bar > div:nth-child(1) > span.inline-block.text-left.vertically-middle");

        callback($(span))
    });
}

function getMovieRating(name, year, callback) {
    // $.ajax("http://www.omdbapi.com/?i=&t=" + name).done(function (data) {
    //     callback(data.imdbRating);
    // });

    getMovieId_scrapping(name, year, function (url) {
        getMovieRating_scrapping(url, function (rating) {
            var number = parseFloat(rating.text()).toFixed(1);
            callback(isNaN(number) ? "N/A" : number);
            // console.log(parseFloat(rating.text()));
        })
    });
}
chrome.runtime.onMessage.addListener(function (message, sender, callback) {
    switch (message.message) {
        case "get_movie_rating":
            getMovieRating(message.movieName, message.movieYear, function (rating) {
                console.log(message.movieName, rating);
                chrome.tabs.sendMessage(sender.tab.id, {
                    message: "set_movie_rating",
                    movieRating: rating,
                    movieId: message.movieId
                });
            });
            break
    }
});