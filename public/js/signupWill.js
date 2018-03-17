$("form.signup").on("submit", function(event) {
	event.preventDefault();

	var userData = {
		email : $("input#email-input").val().trim(),
		password : $("input#password-input").val().trim(),
		userName : $("input#username-input").val().trim()
	}

	if (!userData.email || !userData.password || !userData.userName) {
		return;
	}

	signUpUser(userData)
})

function signUpUser(data) {
	console.log(data);

	localStorage.setItem("Cache-ual-Corner", data.email);
	
	$.post("/api/signup", {
		email : data.email,
		password : data.password,
		userName : data.userName
	}).then(data => {
		window.location.replace("/")
	});
}