import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {RequeriesBoardComponent} from '../requeries-board/requeries-board.component';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit {

  constructor(private taskService: TaskService, private requeriesBoardComponent: RequeriesBoardComponent) {
  }

  description: string;
  tittle: string;
  editableTask: number;
  location: number;

  locations: any[];

  closeEdit(): void {
    this.requeriesBoardComponent.statusEdit = false;
  }

  addTask(): void {
    if (this.description !== '' && this.tittle !== '') {
      this.taskService.addTask(this.tittle, this.description, this.editableTask, this.location).subscribe(() => {
        this.closeEdit();
      });
    } else {
      alert('Заполните все поля');
    }
  }

  getLocations() {
    this.taskService.getLocations().subscribe(data => this.locations = data);
  }

  ngOnInit() {
    this.getLocations();
  }

}
