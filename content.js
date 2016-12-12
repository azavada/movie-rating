(function () {

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


    $("span.topictitle").each(function () {
        var $this = $(this);
        var movieInfo = parseMovie($this.text());

        if (typeof movieInfo !== "undefined") {
            var movieId = guid();

            $this.closest("tr").append("<td id='" + movieId + "'></td>");
            chrome.runtime.sendMessage({
                message: "get_movie_rating",
                movieName: movieInfo.name,
                movieYear: movieInfo.year,
                movieId: movieId
            });
        }
    });

    function parseMovie(string) {
        try {
            var split = string.match(/\s\/\s([^\(\[]*)(\[.*\]\s)?\((\d{4})\)/);
            if (split !== null &&
                split.length >= 4 &&
                typeof split[1] !== "undefined" &&
                typeof split[3] !== "undefined")
            {
                return {
                    name: split[1].trim(),
                    year: split[3].trim()
                };
            } else {
                console.log("CANNOT PARSE", string);
            }
        } catch (e) {
            console.log(e, string);
        }
    }

    chrome.runtime.onMessage.addListener(function (message, sender, callback) {
        if (message.message === "set_movie_rating") {
            var $el = $("#" + message.movieId);
            $el.text(message.movieRating);
        }
    });

})();