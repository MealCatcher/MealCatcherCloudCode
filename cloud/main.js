
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

require('cloud/app.js')

Parse.Cloud.define("hello", function(request, response) {
  
  Parse.Push.send({
	//channels: ["TestRecommendations"],
	where: new Parse.Query(Parse.Installation),
	data: 
	{
		alert: "This is a new recommendation from cloud code!"
	}
}, 
{
	success: function() {
		//Push was 
		console.log("Push was successfull");
	},
error: function(error) {
	//Handle error
	console.error("Got an error " + error.code + " : " + error.message);
}});

  response.success("Hello Jorge cloud!");

});


