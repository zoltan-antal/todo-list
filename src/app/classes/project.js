export default class Project {
  static nextId = 0;

  constructor(name) {
    this.id = Project.nextId;
    Project.nextId++;

    this.name = name;
    this.todoList = [];
  }

  addTodo(todo) {
    this.todoList.push(todo);
  }

  removeTodo(id) {
    const index = this.todoList.findIndex(todo => todo.id === id);
    this.todoList.splice(index, 1);
  }

  changeName(newName) {
    this.name = newName;
  }

  getTodoById(id) {
    for (const todo of this.todoList) {
      if (todo.id === id) {
        return todo;
      }
    }
  }

  toggleTodoCompleteStatusById(id) {
    for (const todo of this.todoList) {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
    }
  }
}
