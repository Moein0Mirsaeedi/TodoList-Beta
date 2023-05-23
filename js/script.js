class Todo {
  constructor(title) {
    this.title = title;
    this.isComplete = "UnComplete";
  }
}

class TodoList {
  constructor(todosContainer) {
    this.todosContainer = todosContainer;
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.todoInput = document.querySelector("input");
    this.addButton = document.querySelector("#addButton");
    this.clearButton = document.querySelector("#clearButton");

    this.render();
  }

  render() {
    console.log("TodoList start working");

    this.todosContainer.innerHTML = "";

    this.todoInput.addEventListener("keyup", (event) => {
      if (event.keyCode == 13) this.addNewTodo(this.todoInput.value);
    });

    this.addButton.addEventListener("click", () => {
      this.addNewTodo(this.todoInput.value);
    });

    this.clearButton.addEventListener("click", () => {
      this.clearTodo();
    });

    this.addTodoToDom();

    this.saveTodosInToLocalStorage();
  }

  addTodoToDom() {
    console.log("Todos add Dom");

    this.todosContainer.innerHTML = "";

    this.todos.forEach((e) => {
      let liElem = document.createElement("li");
      liElem.classList = "completed well";
      liElem.addEventListener("click", (event) => {
        if (event.target.classList == "btn btn-success") {
          this.todos.find((e) => {
            if (e.title == event.target.parentElement.children[0].innerHTML) {
              console.log(event);
              console.log(e);
              if (e.isComplete == "Complete") {
                e.isComplete = "UnComplete";
              } else {
                e.isComplete = "Complete";
              }
            }
          });
        }

        // Ere
        else if (event.target.classList == "btn btn-danger") {
          console.log(event.target.parentElement.children[0]);
          this.deletTodo = [];
          this.todos.filter((a) => {
            if (a.title != event.target.parentElement.children[0].innerHTML) {
              this.deletTodo.push(a);
            }
          });
          this.todos = this.deletTodo;
        }

        this.saveTodosInToLocalStorage();
        this.addTodoToDom();
      });

      let labelElem = document.createElement("label");
      labelElem.innerHTML = e.title;

      let btnCompleteElem = document.createElement("button");
      btnCompleteElem.classList = "btn btn-success";
      btnCompleteElem.innerHTML = e.isComplete;

      let btnRemoveElem = document.createElement("button");
      btnRemoveElem.classList = "btn btn-danger";
      btnRemoveElem.innerHTML = "Remove";

      liElem.append(labelElem, btnCompleteElem, btnRemoveElem);

      this.todosContainer.append(liElem);
    });
  }

  saveTodosInToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addNewTodo(titleNewTodo) {
    let newTodo = new Todo(titleNewTodo);
    console.log(newTodo);
    this.todos.push(newTodo);
    this.todoInput.value = "";
    this.saveTodosInToLocalStorage();
    this.addTodoToDom();
  }

  clearTodo() {
    console.log("Clear the TodoList");
    this.todos = [];
    this.saveTodosInToLocalStorage();
    this.addTodoToDom();
  }
}

let start = new TodoList(document.querySelector("#todoList"));
