const mongoose =
require(
"mongoose"
);

const projectSchema =
new mongoose.Schema(

{

title:{
type:String,
required:true
},

category:{
type:String
},

description:{
type:String
},

technologies:[
String
],

githubLink:{
type:String
},

liveLink:{
type:String
},

screenshots:[
String
],

status:{
type:String,

enum:[
"Completed",
"In Progress",
"Upcoming"
],

default:
"Completed"
}

},

{
timestamps:true
}

);

module.exports =
mongoose.model(
"Project",
projectSchema
);