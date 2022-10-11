import * as requester from './requester.js';


document.body.onload = function() {
	let response = requester.create_request("/api/notice/", "GET")

	response.then(data => {appendAlert(data)})
}

function appendAlert(data) {
	if(data["mesSended"] === true)
	{
		main = document.getElementById("main")
		var alertDiv = document.createElement("div")
		alertDiv.classList.add("alert")

		alertDiv.innerHTML = data["mes"]
		main.appendChild(alertDiv)
		setTimeout(function(){ alertDiv.classList.add("close") }, 3000)
	}
}