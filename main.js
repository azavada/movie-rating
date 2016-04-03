function getMovieId_scrapping(name, callback) {
    $.ajax("http://m.imdb.com/find?ref_=nv_sr_fn&s=all&q=Halo%204%3A%20Forward%20Unto%20Dawn").done(function(data) {
        //http://www.imdb.com/title/tt2262308/
        //http://m.imdb.com/find?ref_=nv_sr_fn&s=all&q=Halo%204%3A%20Forward%20Unto%20Dawn
        // http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=Halo%204%3A%20Forward%20Unto%20Dawn

        var link = $("<div>" + data + "</div>").find("section.posters > div:nth-child(2) > div.label > div.title > a");
       callback($(link).attr("href"));
    });
}

function getMovieRating_scrapping(movieUrl, callback) {
    $.ajax("http://m.imdb.com" + movieUrl).done(function(data) {
        var span = $("<div>" + data + "</div>").
        find("#ratings-bar > div:nth-child(1) > span.inline-block.text-left.vertically-middle");

        callback($(span))
    });
}

// getMovieId_scrapping("", function(url) {
//     getMovieRating_scrapping(url, function(rating) {
//         console.log(parseFloat(rating.text()));
//     })
// });


function getMovieRating(name, callback) {
    $.ajax("http://www.omdbapi.com/?i=&t=" + name).done(function(data) {
        callback(data.imdbRating);
    });
}

getMovieRating("Halo 4: Forward Unto Dawn", function(rating) {
    console.log(rating);
});