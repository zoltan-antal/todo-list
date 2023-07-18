export default class Todo {
  static nextId = 0;

  constructor({title, description, dueDate, priority, isComplete = false}) {
    this.id = Todo.nextId;
    Todo.nextId++;

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
  }

  toggleCompleteStatus() {
    this.isComplete = !this.isComplete;
  }
}
