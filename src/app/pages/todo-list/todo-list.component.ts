import { Component } from '@angular/core';
import { Todo, TodoService } from '../../service/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  todos: Todo[] = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  isEditing: boolean = false;
  currentEditTodo: Todo | null = null;

  constructor(private todoService: TodoService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (this.newTodoTitle === '') {
      this.toastr.error('Title cannot be empty!', 'Error');
      return;
    }

    if (this.isEditing && this.currentEditTodo) {
      this.currentEditTodo.title = this.newTodoTitle;
      this.currentEditTodo.description = this.newTodoDescription;
      this.todoService.updateTodo(this.currentEditTodo);
      this.isEditing = false;
      this.currentEditTodo = null;
    } else {
      this.todoService.addTodo(this.newTodoTitle, this.newTodoDescription);
    }

    this.newTodoTitle = '';
    this.newTodoDescription = '';
    this.todos = this.todoService.getTodos();
  }

  editTodo(todo: Todo): void {
    this.isEditing = true;
    this.currentEditTodo = { ...todo };
    this.newTodoTitle = todo.title;
    this.newTodoDescription = todo.description;
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }

  toggleComplete(todo: Todo): void {
    this.todoService.toggleComplete(todo.id);
    this.todos = this.todoService.getTodos();
  }
}