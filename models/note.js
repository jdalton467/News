

//require the mongoose package
var mongoose = require("mongoose");

//create a schema class 
var Schema = mongoose.Schema;

//create the note schema

var NoteSchema =  new Schema({
	body:{
		type:String
	}
});


//mongoose will save the Objectids of the notes which are referred to
// in the article model

var Note = mongoose.model("Note", NoteSchema);

//exporting the Note model
module.exports = Note;