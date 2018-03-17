$("form.update").on("submit", function(event) 
{
	event.preventDefault();

	var updateData = {
		userName: $("#userName").val().trim(), 
		avatar_image:$("input:radio[name ='img']:checked").val(),
		message_color: $("#updateColor").val(),
		email: localStorage.getItem("Cache-ual-Corner"),
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
	}).then(
		window.location.replace("/")
	);
}