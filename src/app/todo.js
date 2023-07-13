export default class Todo {
  static nextId = 0;

  constructor({title, description, dueDate, priority}) {
    this.id = Todo.nextId;
    Todo.nextId++;

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

}
