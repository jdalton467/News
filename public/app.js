
var newDiv;




$(document).on("click", "#display", function() { //event-handler for the scrape button
    $(".stories").empty();
    $.getJSON("/articles", function(data) { //will dump all of our scraped data into a well
        // For each one
        for (var i = 0; i < 20; i++) {
            // Display the apropos information on the page
            var newDiv = $("<div>");
            
            newDiv.addClass("well");
            newDiv.append(i + 1 + "<p data-id='" + data[i]._id + "'>" + data[i].story +  data[i].link + "</p>");
            newDiv.append("<button type='button' class='btn btn-primary' id='comment-button" + (i+1) +"'>" + "Comment" + "</button>");
            
            $(".stories").append(newDiv);
            $(".stories").append("<br>");
            
        }

    });

});


$(document).on("click", "#comment-button", function(){
   for(var i = 1; i < 20; i++){
            if($("#comment-button" + i).data('clicked',true)) {
            $("#comment-button" + i).hide();
            var newDiv = $("<div>");
            // newDiv = newDiv;
            newDiv.append("<div class='panel panel-default'>");
            newDiv.append("<div class='panel-heading'>");
            // newDiv.append("User Comments");
            newDiv.append("</div>");
            newDiv.append("<div class='panel-body'>");
            newDiv.append("<textarea class='form-control' rows='3'>" + "</textarea>");
            newDiv.append("<button type='button' class='btn btn-primary' id='save-button" + i + "'>" + "Save" + "</button>");
            newDiv.append("<button type='button' class='btn btn-primary' id='cancel-button" + i + "'>" + "Cancel" + "</button>");
            newDiv.append("</div>");
            newDiv.append("</div>");
            newDiv.append("<br></br>");
            $(".well").append(newDiv);
        }
        }
});

















$(document).on("click", "#cancel-button" , function(){
    $(".panel-default").hide();
    $(".panel-heading").hide();
    $("User Comments").hide();
    $(".panel-body").hide();
    $("textarea").hide();
    $("#save-button").hide();
    $("#cancel-button").hide();
    $("#comment-button").show();
    
});