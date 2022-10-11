import * as requester from './requester.js';


const content = document.getElementById("content")
let isLoading = false
let isAddingTask = false
let currentPage = "/api/tasks/"
let body = document.body
let currentTask = null


;(() => {
  getAndAppendTasks()
  window.addEventListener('scroll', timer(checkPosition, 250))
  window.addEventListener('resize', timer(checkPosition, 250))
})()

function addButtons(e, element, buttonText, funcApply, funcCancel)
{
  if(isAddingTask)
  {
    let addingTask = document.getElementById("adding-task")
    if(e.target.parentElement === addingTask.parentElement)
    {
      return
    }
    addingTask.lastChild.onclick()
  }
  
  isAddingTask = true
  let div = document.createElement("div")
  div.id = "adding-task"
  let applyButton = document.createElement("button")
  applyButton.classList.add("button")
  applyButton.innerHTML = buttonText
  applyButton.onclick = function(){funcApply(e); div.remove(); isAddingTask = false}
  
  const old_text = element.lastChild.value
  
  let cancelButton = document.createElement("button")
  cancelButton.classList.add("button")
  cancelButton.innerHTML = "Отмена"
  if(funcCancel == null)
  {
    cancelButton.onclick = () => { div.remove(), isAddingTask = false, element.lastChild.value = old_text, resize(element.lastChild)}
  }
  else
  {
    cancelButton.onclick = funcCancel
  }
  
  
  div.appendChild(applyButton)
  div.appendChild(cancelButton)
  
  element.appendChild(div)
}

document.getElementById("add-task").onclick = function() {
  function deleteAddedDiv()
  {
    div.remove()
    isAddingTask = false
  }
    
  let div = document.createElement("div")
  
  let input = document.createElement("textarea")
  input.classList.add("add-task")
  input.classList.add("block")
  input.placeholder = "Введите текст задачи"
  autoresize(input)
  
  div.appendChild(input)
  
  addButtons(null, div, "Добавить",
  function() {
    let body = {
         "text": input.value,
         "is_done": false
    }
    let response = requester.create_request("/api/tasks/", "POST", body)
    response.then(data => appendTask(data))
    deleteAddedDiv()
  },
  deleteAddedDiv
  )
    
  content.appendChild(div)
}


function checkPosition() {
  
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight
  
  const scrolled = window.scrollY
  
  const threshold = height - screenHeight / 4
  const position = scrolled + screenHeight

  if (position >= threshold) {
      getAndAppendTasks()
  }
}

function timer(func, timeout) {
  let timer = null

  return function perform(...args) {
    if (timer) return

    timer = setTimeout(() => {
      func(...args)

      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}

function appendTasks(data)
{
  for(var i in data["results"])
  {
    i = data["results"][i]
    appendTask(i)
  }
}

function updateTask(e)
{
  let body = {
         "text": e.target.parentElement.querySelector(".task-name").value,
         "is_done": e.target.parentElement.firstChild.checked
  }
  
  let response = requester.create_request("/api/tasks/"+e.target.parentElement.id.toString()+"/", "PUT", body)
  response.then(data => {e.target.parentElement.querySelector(".task-name").value = data["text"], resize(e.target.parentElement.querySelector(".task-name"))})
  
}

function appendTask(i)
{
  let div = document.createElement("div")
  div.classList.add("item")
  div.id = i["id"]
  let checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.checked = i["is_done"]
  checkbox.onchange = updateTask
  div.appendChild(checkbox)
  let input = document.createElement("textarea")
  input.value = i["text"]
  input.classList.add("task-name")
  
  const deleteButton = document.createElement("button")
  deleteButton.innerHTML = "Удалить"
  deleteButton.onclick = function(e) 
  { 
    let response = requester.create_request("api/tasks/"+e.target.parentElement.id+"/", "DELETE",)
    e.target.parentElement.remove() 
  }
  deleteButton.classList.add("deleteButton")
  deleteButton.classList.add("button")
  
  div.appendChild(deleteButton)
  div.onmouseover = function(e)
    {
      div.querySelector(".deleteButton").classList.add("show")
    }
  div.onmouseleave = function(e)
    {
      div.querySelector(".deleteButton").classList.remove("show")
    }  
  
  input.onfocus = e => {addButtons(e, div, "Сохранить", updateTask)}
  div.appendChild(input)
  autoresize(input)
  content.appendChild(div)
}

function getAndAppendTasks()
{
  if (currentPage != null && isLoading == false)
  {
    isLoading = true
    let promise = requester.create_request(currentPage, "GET")
    promise.then(data => {appendTasks(data), currentPage = data["next"], isLoading = false}) 
  }
}

function OnInput(textarea) {
  textarea.style.height = 0;
  textarea.style.height = (textarea.scrollHeight) + "px";
}

async function autoresize(textarea)
{ 
  textarea.style.height = 0;
  let textareaStyle = await window.getComputedStyle(textarea)
  textarea.style.height = (textarea.scrollHeight) + "px";
  
  textarea.addEventListener("input", () => OnInput(textarea), false);
  window.addEventListener("resize", () => OnInput(textarea), false);
}

async function resize(textarea)
{ 
  textarea.style.height = 0;
  textarea.style.height = (textarea.scrollHeight) + "px";
}
