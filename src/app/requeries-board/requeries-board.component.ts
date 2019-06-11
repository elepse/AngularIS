import {Component, OnInit} from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-requeries-board',
  templateUrl: './requeries-board.component.html',
  styleUrls: ['./requeries-board.component.scss']
})
export class RequeriesBoardComponent implements OnInit {
  constructor(private taskService: TaskService) {
    this.tasksSearch();
  }

  private searchParams = new Subject<Task>();
  tasks$: Observable<any[]>;
  locations: any[];
  users: any[];

  statusEdit = false;

  params: Task = {
    taskId: null,
    tittle: null,
    description: null,
    createAt: null,
    editAT: null,
    creator: null,
    lastEditor: null,
    performing: null,
    location: null,
    theme: null,
    status: null
  };

  tasksSearch(): void {
    this.searchParams.next(this.params);
  }

  getUser(): void {
    this.taskService.getUsers().subscribe(users => this.users = users);
  }

  getLocations(): void {
    this.taskService.getLocations().subscribe(locations => this.locations = locations);
    console.log(this.locations);
  }

  changeStatus(): void {
    this.statusEdit = !this.statusEdit;
  }

  ngOnInit() {
    this.tasks$ = this.searchParams.pipe(
      debounceTime(300),
      switchMap((params: Task) => this.taskService.searchTasks(params))
    );
    this.getUser();
    this.getLocations();
  }
}
