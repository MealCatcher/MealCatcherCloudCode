
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

require('cloud/app.js')

console.log("I am going to start testing");

Parse.Cloud.define("hello", function(request, response){
  
 console.log("I am going to start testing 1.0");

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
		}
	});

	response.success("Hello Jorge cloud!");
});

Parse.Cloud.afterSave("Recommendation", function(request){
	query = new Parse.Query("Recommendation");
	if(query)
	{
		console.log("the query exists");
		console.log(request);
		console.log(request.object);
		console.log(request.object.id);
		console.log(request.object.get("restaurant"));
		console.log(request.object.get("parent"));
		console.log(request.object.get("parent").objectId);
		var parentTest = request.object.get("parent");
		console.log("Parent Test: " + parentTest);
		console.log("Object Id 1: " + parentTest["objectId"]);
		console.log("Object Id 2:" + parentTest.objectId);
		console.log("Object Id 3:" + parentTest.id);

		var userQuery = new Parse.Query(Parse.User);
		if(userQuery)
		{
			console.log("user query is not null");
			userQuery.get(parentTest.id, {
				success: function(user) {
					console.log("got the user successfully");

					var pushQuery = new Parse.Query(Parse.Installation);
					pushQuery.matchesQuery('owner', userQuery);

					Parse.Push.send({
						where: pushQuery, 
						data: {
							alert: "Free hotdog!"
						}
					}, {
						success: function() {
							console.log("the push was successfull");
						}, 
						error: function(error) {
							console.error("the push was not successfull");
						}
					});
				},
				error: function(error) {
					console.error("Got an error");
				}
			});
		}
		else
		{
			console.log("user query is null");
		}
		/*userQuery.get(parentTest.id, success: function(user) {
				//object was retrieved successfully
				console.log("The user was retrieved successfully");
			}, 
			error: function(object, error) {
				//The object was not retrieved successfullu
				console.error("The object was not retrieved successfully");
			}
		});*/

	}
	else
	{
		console.log("the query is null");
	}
	/*query.get(request.object.get("recommendation").restaurant, {
		success: function(post) {
			console.log("I am going to start testing 1.1");
		},
		error: function(error){
			//handle error
			console.log("I am going to start testing 1.2");
		}
	})*/
});


