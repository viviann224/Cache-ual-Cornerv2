$("form.update").on("submit", function(event) 
{
	event.preventDefault();

	var updateData = {
		userName: $("#userName").val().trim(), 
		avatar_image:$("input:radio[name ='img']:checked").val(),
		message_color: $("#updateColor").val(),
		email:useremail,
		logged: true
	}

	updateUserInfo(updateData)
})

function updateUserInfo(data) {
	console.log(data);

	$.ajax({
		method : "PUT",
		url : "/api/update/",
		data : data
	}).then(getUpdate);
}

function getUpdate() {
	$.get("/api/update/", function(res) {
		updateArr = res;
		console.log(updateArr);
	})
}

//logout setting logged state to false
//you need to update login button name from
//.navbar-brand to NEW
$(".navbar-brand").on("click", function(event)
{

	var signoutData =
	{
		email:useremail,
		logged:false
	}
	

	$.ajax({
		method : "PUT",
		url : "/logout",
		data : signoutData
	}).then(getUpdate);
console.log(useremail+ " signing out");
	$.get("/logout").then(function(data) {
    
  });

});
//end of logout call