export default class Todo {
  static nextId = 0;

  constructor({title, description, dueDate, priority, isComplete = false}) {
    this.id = Todo.nextId;
    Todo.nextId++;

    this.title = title;
    if (description) {
      this.description = description;
    }
    if (dueDate) {
      this.dueDate = new Date(dueDate.year, dueDate.month, dueDate.day);
    }
    this.priority = priority;
    this.isComplete = isComplete;
  }
}
