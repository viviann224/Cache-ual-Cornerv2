$( document ).ready(function() {

	//var updateName="please sign up to start chatting";
	if(localStorage.getItem("Cache-ual-Corner"))
	{	
		$.get("/api/user/" + localStorage.getItem("Cache-ual-Corner"), function (data) 
		{
		    $(".member-name").text(data.userName);
		    //$("#userAvatar").attr("src", data.avatar_image);
 		 });


		// $.get("/api/user/" + localStorage.getItem("Cache-ual-Corner"),then(function(data)
		// {
		// 	console.log(data)
		
		// 	$(".member-name").text(data.userName);
		// });
		
		//updateName=localStorage.getItem("Cache-ual-Corner");
	}
	$(".member-name").html('<br><a href="/signup">please sign up to start chatting</a>');
});


$("form.update").on("submit", function(event)
{
	event.preventDefault();

	var updateData = {
	/*	userName: $("#userName").val().trim(), */
		avatar_image:$("input:radio[name ='img']:checked").val(),
		message_color: $("#updateColor").val(),
		email: localStorage.getItem("Cache-ual-Corner"),
		logged: true
	}

	/*if (updateData.userName === "") {
		updateData.userName = "I forgot to choose a name";
	}
*/
	updateUserInfo(updateData)
})

function updateUserInfo(data) {
	localStorage.setItem("skinChoice", $("#skinChoice").val().trim());

	$.ajax({
		method : "PUT",
		url : "/api/update/",
		data : data
	}).then(
		window.location.replace("/")
	);
};
