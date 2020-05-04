import { Component, OnInit, ViewEncapsulation, Inject, OnDestroy, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ApplicationService } from '../../../../_services/application.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../../_services';
import { User } from 'src/app/_models/user';
import { Task } from 'src/app/_models/task';
import { DatePipe } from '@angular/common';
import { ScrollEvent } from 'ngx-scroll-event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  @ViewChild('dashboardTable', { static: false }) table: ElementRef;
  public tasks: Task[] = [];
  baseUrl: string;
  isReady: boolean = false;
  currentUser: User;
  selectedStatus: number = 1;
  selectedTask: Task;
  currentPage: number = 1;  

  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private applicationService: ApplicationService,
    private toastr: ToastrService,
    private datepipe: DatePipe,
    private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void { 
    this.loadTasks();
  }

  private loadTasks(): void {
    this.isReady = false;
    this.applicationService.getTasksPagination(this.selectedStatus, this.currentPage).pipe(first())
      .subscribe( result => {
        this.isReady = true;
        this.tasks = result;
      },
      error => {
        this.isReady = true;
        console.log(error);
        this.toastr.error(error);
      });
  }

  public onScroll(event: ScrollEvent) {
    if (event.isReachingBottom) {
      this.currentPage++;
      this.loadTasks();
    }
  }

  public onChangeFilter() {
    this.selectedTask = null;
    this.loadTasks();
  }

  public selectTask(task: Task) {
    this.selectedTask = task;
  }

  public completeTask(taskId: string) {
    this.setNewTaskStatus(taskId, 2);
  }

  public removeTask(taskId: string) {
    this.setNewTaskStatus(taskId, 3);
  }

  private setNewTaskStatus(taskId: string, statusId: number) {
    this.isReady = false;
    const task: Task = Task.createNewTask(this.currentUser.id);
    task.id = taskId;
    task.deadline = new Date();
    task.statusId = statusId;
    this.applicationService.changeTaskStatus(task).pipe(first())
      .subscribe( result => {
        this.loadTasks();        
        this.toastr.info("Status changed!");
      },
      error => {
        this.isReady = true;
        console.log(error);
        this.toastr.error(error);
      });
  }

  public formatDate(date: Date): string {
    if (date) {
      return this.datepipe.transform(date, 'dd.MM.yyyy');
    }
    return "";
  }
}1
