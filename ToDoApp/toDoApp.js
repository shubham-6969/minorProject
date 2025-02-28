const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');


let allTodos = getTodos();
updateTodoList();

//e.preventDefault(); – Isse page refresh hone se bachata hai.


todoForm.addEventListener('submit', function(e){
  e.preventDefault();

//addTodo(); function call hota hai jo naye todos add karega.


  addTodo();
})

// naya todo add karna

function addTodo(){

  //todoInput.value.trim(); – Ye user ke input se leading/trailing spaces hata kar text store karega

  /* Agar text empty nahi hai, to ek todo object create hota hai jisme:
Text – jo user likhta hai.

completed: false – initially false rahega kyunki naye task complete nahi hote.
Ye new todo allTodos array me push ho jata hai.

updateTodoList(); function call hota hai jo naye todos ko UI pe update karega.
todoInput.value = ""; – Input box ko empty kar diya jata hai taaki user naya todo likh sake*/
  
  const todoText = todoInput.value.trim();
  if(todoText.length > 0){
    const todoObject = {
      Text: todoText,
      completed: false
    }
    allTodos.push(todoObject);
    updateTodoList();
    todoInput.value = "";
  }
}

//updateTodoList() function call hota hai jo UI pe todos ko dikhane ka kaam karega (UI Render).

/* 

todoListUL.innerHTML = ""; – Pehle list ko empty kar diya jata hai taki naye todos ko dubara render kiya ja sake.

allTodos.forEach() – Ye loop har todo item ke liye createTodoItem() function ko call karta hai jo ek list item (li) banata hai aur use UI me add karta hai.

*/

function updateTodoList(){
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}
/* 
    Todo list item banana

todoId – har todo item ko ek unique ID di jati hai.

document.createElement("li") – ek naya list item (li) banaya jata hai.

*/
function createTodoItem(todo, todoIndex){
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  const todoText = todo.Text;
  todoLI.className = "todo";
  todoLI.innerHTML = `
    <input type="checkbox" id ="${todoId}">
    <label class="custom-checkbox" for="${todoId}">
      <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
    </label>
    <label for="${todoId}" class="todo-text">
      ${todoText}
    </label>
    <button class="delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
      </svg>
    </button>
  `;
 
// Delete button ke click par item delete hoga

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  })
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", ()=>{
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  })
  checkbox.checked = todo
  return todoLI;
}
function deleteTodoItem(todoIndex){
  allTodos = allTodos.filter((_, i)=> i !==todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos(){
  const todoJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todoJson);
}


//getTodos() function ko call kiya jata hai jo local storage me saved todos ko retrieve karega.

function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}