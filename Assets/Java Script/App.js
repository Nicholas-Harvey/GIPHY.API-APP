$(document).ready(function () {

    var topics = ["Baseball", "Carl Sagan", "Belgium"];

    function renderButtons() {
        console.log("renderButtons is running");
        $("#button-view").html("");
        for (i = 0; i <= topics.length - 1; i++) {
            $("#button-view").append("<button name='gifButton' class='buttons' value='" + topics[i] +
                "'>" + topics[i] + "</button>");
        }
        $(document).on("click", "#add-topic", function () {
            // $(".gifDiv").empty();
            $("#sport-input").val('');
            if (".input-area" === []) {
                !renderButtons();
            }
            // preventDefault();
            $(".buttons").on("click", function () {
                $(".gifDiv").empty();

                // $("#gifs-appear-here").html("");

                q = $(this).val();
                console.log(q);

                console.log("topic button pressed!")
                var APIKey = "hX67Cfn42uae7k45GuGSLl7E5aG16LR2";

                var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=" +
                    APIKey +
                    "&limit=10";

                $.ajax({
                        url: queryURL,
                        method: "GET"
                    })

                    .then(function (response) {
                        var results = response.data;
                        for (i = 0; i < results.length; i++) {

                            var gifDiv = $("<div class='item'>");
                            // console.log(gifDiv);

                            var rating = results[i].rating;

                            var p = $("<p>").text("Rating: " + rating);
                            console.log(response);

                            var gifImage = $("<img>");

                            console.log(response.gif)

                            gifImage.attr("data-still", results[i].images.fixed_height_still
                                .url);

                            gifImage.attr("data-animate", results[i].images.fixed_height
                                .url);

                            gifImage.attr("src", gifImage.attr("data-still"));

                            gifImage.attr("data-state", "still");

                            gifDiv.prepend(p);
                            gifDiv.prepend(gifImage);

                            $(".gifDiv").prepend(gifDiv);

                        }

                        $("img").on("click", function () {

                            console.log("clicked");

                            var state = $(this).attr("data-state");

                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            }

                            if (state === "animate") {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");

                            }

                        });



                    });

            });
        });
    };
    $("#add-topic").on("click", function () {
        console.log("add topic button pressed");
        if (event.keyCode === 13) {
            $("#add-topic").click();
        }
        // $(gifDiv).empty();

        topics.push($("#sport-input").val());
        console.log(topics);

        $("#button-view").append("<button name='gifButton' class='buttons' value='" + topics[
            topics.length - 1] + "'>" + topics[topics.length - 1] + "</button>");

    });

    var q;

    renderButtons();



});