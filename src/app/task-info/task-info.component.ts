import {Component, Input, OnInit} from '@angular/core';
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

  @Input() task: any;
  @Input() typeChange: number;

  description: string;
  tittle: string;
  editableTask: number;
  location: number;

  locations: any[];
  performers: any[] = this.requeriesBoardComponent.performers;

  closeEdit(): void {
    this.requeriesBoardComponent.statusEdit = false;
  }

  addTask(): void {
    if (this.description !== '' && this.tittle !== '') {
      this.taskService.addTask(this.tittle, this.description, this.editableTask, this.location).subscribe(() => {
        this.requeriesBoardComponent.tasksSearch();
        this.closeEdit();
      });
    } else {
      alert('Заполните все поля');
    }
  }

  getLocations() {
    this.taskService.getLocations().subscribe(data => this.locations = data);
  }

  savePerforming(task, performer): void {
    this.taskService.addPerformer(task, performer).subscribe(data => {
      this.requeriesBoardComponent.statusEdit = false;
      this.requeriesBoardComponent.tasksSearch();
    });
  }

  ngOnInit() {
    this.getLocations();
  }

}
