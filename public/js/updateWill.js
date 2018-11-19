$( document ).ready(function() {

	var avatarArr=["../img/avatar/avatar01.jpg","../img/avatar/avatar02.jpg","../img/avatar/avatar03.jpg", "../img/avatar/avatar04.jpg", "../img/avatar/avatar05.jpg", "../img/avatar/avatar11.jpg"];
	//var updateName="please sign up to start chatting";
	if(localStorage.getItem("Cache-ual-Corner"))
	{	
		$.get("/api/user/" + localStorage.getItem("Cache-ual-Corner"), function (data) 
		{
		    $(".member-name").text(data.userName);
		    $("#radioList").empty();
		    $("#chooseAvatar").show();
			$("#chooseColor").show();
		
			$("#updateColor").show();
	
		    for(var i=0;i<avatarArr.length;i++)
		    {
		    	if(data.avatar_image!= avatarArr[i])
		    	{

		    		var inputField= $('<input>');
		    		//' type="radio" name="img" checked="checked">';
		    		inputField.attr("type", "radio");
		    		inputField.attr("name", "img");
		    		inputField.attr("value", avatarArr[i]);
		    		var inputImageField= $('<img>');
		    		inputImageField.attr("src", avatarArr[i]);
		    		inputImageField.attr("id", "icon");
		    		//inputField.append(inputImageField);
		    		//imageAvatar.attr("src", animals[x]);
		    		$("#radioList").append(inputField);
		    		$("#radioList").append(inputImageField);
		    	}
		    	else
		    	{
		    		var inputField= $('<input>');
		    		//' type="radio" name="img" checked="checked">';
		    		inputField.attr("type", "radio");
		    		inputField.attr("name", "img");
		    		inputField.attr("value", avatarArr[i]);
		    		inputField.attr("checked", "checked");
		    		var inputImageField= $('<img>');
		    		inputImageField.attr("src", avatarArr[i]);
		    		inputImageField.attr("id", "icon");
		    		//inputField.append(inputImageField);
		    		//imageAvatar.attr("src", animals[x]);
		    		$("#radioList").append(inputField);
		    		$("#radioList").append(inputImageField);
		    		$("#updateColor").removeAttr("value");
		    		$("#updateColor").attr("value", data.message_color);

		    	}
		    }
		    //$("#userAvatar").attr("src", data.avatar_image);
 		 });


		// $.get("/api/user/" + localStorage.getItem("Cache-ual-Corner"),then(function(data)
		// {
		// 	console.log(data)
		
		// 	$(".member-name").text(data.userName);
		// });
		
		//updateName=localStorage.getItem("Cache-ual-Corner");
	}
	$("#chooseAvatar").hide();
	$("#chooseColor").hide();

	$("#updateColor").hide();
	
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
