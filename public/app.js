var newDiv;




$(document).on("click", "#display", function() { //event-handler for the scrape button
    $(".stories").empty();
    $.getJSON("/articles", function(data) { //will dump all of our scraped data into a well
        // For each one
        for (var i = 1; i < 20; i++) {
            // Display the apropos information on the page
            var newDiv = $("<div>");

            newDiv.addClass("well");
            newDiv.append(i + "<p data-id='" + data[i]._id + "'>" + data[i].story + data[i].link + "</p>");
            // newDiv.append("<button type='button' class='btn btn-primary' id='comment-button" + (i+1) +"'>" + "Comment" + "</button>");
            // newDiv.append("<div class='panel panel-default'>");
            // newDiv.append("<div class='panel-heading'>");
            // newDiv.append("User Comments");
            // newDiv.append("</div>");
            $(".stories").append(newDiv);
            $(".stories").append("<br>");

        }
        if (data.note) {
            // Place the title of the note in the title input
            $("textarea").val(data.note.body);
            console.log(data.note.body);
            // Place the body of the note in the body textarea

        }
    });

});


$(document).on("click", "p", function() { //event-handler for the scrape button
            $(".notes").empty();
            var thisId = $(this).attr("data-id");

            $.ajax({
                    method: "GET",
                    url: "/articles/" + thisId
                })
                // With that done, add the note information to the page
                .done(function(data) {
                        var newDiv = $("<div>");
                        newDiv.append("<div class='panel-body'>");
                        newDiv.append("<textarea class='form-control' rows='3' id='textarea' >" + "</textarea>");

                        newDiv.append("<button data-id='" + data._id + "' type='button' class='btn btn-primary' id='save-button'>" + "Save" + "</button>");
                        // newDiv.append("<button type='button' class='btn btn-primary' id='cancel-button'>" + "Cancel" + "</button>");
                        newDiv.append("</div>");
                        // newDiv.append("</div>");
                        // newDiv.append("<br></br>");
                        $(".notes").append(newDiv);
                        $(".notes").append("<br>");



                    });


                });






        $(document).on("click", "#save-button", function() {
            // Grab the id associated with the article from the submit button
            var thisId = $(this).attr("data-id");

            // Run a POST request to change the note, using what's entered in the inputs
            $.ajax({
                    method: "POST",
                    url: "/articles/" + thisId,
                    data: {
                        // Value taken from title input
                        // Value taken from note textarea
                        body: $("textarea").val()
                    }
                })
                // With that done
                .done(function(data) {
                    // Log the response
                    console.log(data);
                    // Empty the notes section
                    $(".notes").empty();
                });

            // Also, remove the values entered in the input and textarea for note entry
            // $("textarea").val("");

        });