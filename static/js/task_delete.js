import * as requester from "./requester.js";


let deleteButton = document.createElement("button")
deleteButton.onclick = function(e) 
{ 
  let response = requester.create_request("api/tasks/"+e.target.parentElement.id+"/", "DELETE",)
  response.then(data => console.log(data))
  e.target.parentElement.remove() 
}

let items = await document.getElementsByClassName("item")
console.log(items)

for(let i = 0; i < items.length; i++)
{
  items[i].appendChild(deleteButton)
  items[i].onhover = function(e)
    {
      items[i].deleteButton.classList.toggle("show")
    } 
}