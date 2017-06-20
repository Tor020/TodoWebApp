var todoList = {
  todos: [],

  addTodo: function (todoText) {
    this.todos.push({
    todoText: todoText,
    completed: false
    });
    view.displayTodos();
  },
  changeTodo: function (i, todoText) {
    this.todos[i].todoText = todoText;
    view.displayTodos();
  },
  deleteTodo: function (i) {
    this.todos.splice(i, 1);
    view.displayTodos();
  },
  toggleCompleted: function (i) {
    var todo = this.todos[i];
    todo.completed = !todo.completed;
    view.displayTodos();

  },
  toggleAll: function () {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
    view.displayTodos();
  }
};

var handlers = {

  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();

  },
  addTodo: function () {
    var txt = document.getElementById('txtInput');

    todoList.addTodo(txt.value);
    txt.value = '';
    view.displayTodos();

  },
  changeTodo: function () {
    var changeI = document.getElementById('chaI').valueAsNumber;
    var changeTxt = document.getElementById('chaT').value;
    todoList.changeTodo(changeI, changeTxt);
    document.getElementById('chaT').value = '';
    document.getElementById('chaI').valueAsNumber = '';
    view.displayTodos();

  },
  deleteTodo: function (i) {
    todoList.deleteTodo(i);
    view.displayTodos();

  },
  completeTodo: function () {
    var completeI = document.getElementById('compI').valueAsNumber;
    console.log(completeI);
    console.log(completeI.typeof)
    view.displayTodos();

    todoList.toggleCompleted(completeI);
    document.getElementById('compI').valueAsNumber = '';
  }
};

var view = {

  displayTodos: function () {

    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    for (var i = 0; i < todoList.todos.length; i++) {

      var todoLi = document.createElement('li');
      var todoCompletion = '';
      var todo = todoList.todos[i].todoText;

      if (todoList.todos[i].completed === true) {
        todoCompletion = '(x) ' + todo;
      } else {
        todoCompletion = '() ' + todo;
      }

      todoLi.id = i;
      todoLi.textContent = todoCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createEventListeners: function () {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function (e) {
      var elementClicked = event.target
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.createEventListeners();