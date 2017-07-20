//require dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");

var Note = require("./models/note.js");
var Article = require("./models/article.js");

//intialize express
var app = express();

//configure the app to use body parser and morgan

// app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

//automatically serve static files from the public folder
app.use(express.static("public"));

//setting up the mongoose connection to the mongo database

mongoose.connect("mongodb://heroku_025ddc91:rvg17rjou88erh1lve95urpdn2@ds163672.mlab.com:63672/heroku_025ddc91");

var db = mongoose.connection;

//log error message if connection fails
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

//log success message once the connection goes through
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

//setting a get request to scrape the 
//new york times front page

app.get("/scrape", function(req, res) {
    //grab the body of the nyt with request
    request("https://www.nytimes.com/", function(error, response, html) {
        //load the html into cheerio and use that as a selector
        var $ = cheerio.load(html);

        //grab every h2 with the class "story-heading"

        $("h2.story-heading").each(function(i, element) {
            //save the text of the heading in a heading variable
            var story = $(element).text();

            //saving the  href values of the children "a"

            var link = $(element).children().attr("href");

            //save an empty result object
            var result = {};

            result.story = story;
            result.link = link;

            var article = new Article(result);

            article.save(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }
            });



        });

    });
    res.send("Scrape Complete");
});



app.get("/articles", function(req, res){

	Article.find({}, function(error, doc){
		if (error) {
			res.send(error);
		}
		else{
			res.send(doc);
		}
	});
});


app.listen(3000, function() {
    console.log("App running on port 3000!");
});