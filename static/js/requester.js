export async function create_request(url, method, body=null)
{
    let response
    if(method != "GET")
    {
      let csrftoken = getCookie("csrftoken")
      response = await fetch(url, {method: method, body: JSON.stringify(body), headers: {'Content-Type': 'application/json; charset=UTF-8', "X-CSRFToken": csrftoken}}); 
    }
    else
    {
      response = await fetch(url, {method: method});
    }
  	
  	if (response.ok)
  	{
  	  let json = await response.json();
  	  return json
  	}
  	else
  	{
  	  alert("Ошибка HTTP: " + response.status);
  	}
}

function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

export * from './requester.js';
