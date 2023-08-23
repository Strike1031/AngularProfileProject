import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo | any

  @Output() editClick: EventEmitter<void> = new EventEmitter();
  @Output() deleteClick: EventEmitter<void> = new EventEmitter();


  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  onEditClick() {
    this.editClick.emit();
  }

  onDeleteClick() {
    this.deleteClick.emit();

    this.notificationService.show('Tarefa Deletada!');
  }
}
