
// Use Parse.Cloud.define to define as many cloud functions as you want.

require('cloud/app.js')

Parse.Cloud.define("hello", function(request, response){
	response.success("Hello World");
});

Parse.Cloud.afterSave("Recommendation", function(request){
	query = new Parse.Query("Recommendation");
	if(query)
	{
		//console.log(request);

		var recommenderName = request.user.get("name");
		var parentTest = request.object.get("parent");

		var userQuery = new Parse.Query(Parse.User);

		if(userQuery)
		{
			userQuery.get(parentTest.id, {
				success: function(user) {
					console.log("got the user successfully");

					var pushQuery = new Parse.Query(Parse.Installation);
					pushQuery.matchesQuery('owner', userQuery);

					var shareMessage = recommenderName + " recommends " + request.object.get("restaurant");

					Parse.Push.send({
						where: pushQuery, 
						data: {
							alert: shareMessage
						}
					}, {
						success: function() {
							console.log("The push was successfull.");
						}, 
						error: function(error) {
							console.error("The push was not successfull");
						}
					});
				},
				error: function(error) {
					console.error("Error: " + error.message + " " + error.code);
				}
			});
		}
		else
		{
			console.log("The query did not work. It's null.");
		}
	}
	else
	{
		console.log("The query did not work. It's null.");
	}
});


