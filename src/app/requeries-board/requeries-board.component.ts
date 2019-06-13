import {Component, OnInit} from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-requeries-board',
  templateUrl: './requeries-board.component.html',
  styleUrls: ['./requeries-board.component.scss']
})
export class RequeriesBoardComponent implements OnInit {
  role: number;

  constructor(private taskService: TaskService, private authService: AuthService) {
    this.authService.checkAuth();
  }


  private searchParams = new Subject<Task>();
  tasks$: Observable<any[]>;
  locations: any[];
  performers: any[];
  staff: any[];

  statusEdit = false;
  selectTask: number;
  typeChange: number; // 1 добавление нового 2 редактирование

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

  getPerformers(): void {
    this.taskService.getUsers(3).subscribe(performers => this.performers = performers);
  }

  getStaff(): void {
    this.taskService.getUsers(2).subscribe(staff => this.staff = staff);
  }

  getLocations(): void {
    this.taskService.getLocations().subscribe(locations => this.locations = locations);
  }

  changeStatus(): void {
    this.typeChange = 1;
    this.statusEdit = !this.statusEdit;
  }

  ngOnInit() {
    this.role = this.authService.authUser.role;
    this.tasks$ = this.searchParams.pipe(
      debounceTime(300),
      switchMap((params: Task) => this.taskService.searchTasks(params))
    );
    this.getPerformers();
    this.getLocations();
    this.getStaff();
  }
}
