

///to make the article model we need to require the the mongoose
//schema

//require the mongoose package 
var mongoose = require("mongoose");

// Create Schema class
var Schema = mongoose.Schema;
// create a schema class that will define how documents
//will be structured in our collections


//creating a new schema that will be the shape of the article 
//documents submitted to our collection
var ArticleSchema = new Schema({
	story: {
		type: String,
		required: true
	},
	link:{
		type:String,
		required:true
	},
	note:{
		type:Schema.Types.ObjectId,
		ref: "note"
	}
});

//create and artice model and export it 
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;