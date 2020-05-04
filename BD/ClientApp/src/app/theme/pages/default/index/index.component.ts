import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { FormGroup, FormBuilder, NgForm, NgModel } from '@angular/forms';
import { Task } from '../../../../_models/task';
import { ApplicationService } from '../../../../_services/application.service';
import { first, map } from 'rxjs/operators';
import {
  ValidationService,
  AuthenticationService
} from '../../../../_services';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../_guards/exit.guard';
import { User } from 'src/app/_models/user';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent
  implements OnInit {
  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.baseUrl = baseUrl;
    route.params.subscribe(params=> { 
      this.taskId = params['id']
      this.isEdit = this.taskId ? true : false;
    });
  }

  get userId() {
    return this.currentUser.id;
  }
  @ViewChild('applicationForm', {static: false}) applicationForm: NgModel;

  taskId: string;
  task: Task;
  currentUser: User;
  baseUrl: string;
  isEdit: boolean = false;
  isReady: boolean = false;
  isSaved = false;
  selectedDate: NgbDateStruct;

  ngOnInit() {
    if (!this.isEdit && !this.taskId) {
      this.task = Task.createNewTask(this.currentUser.id);
      this.taskId = this.task.id;
      this.isReady = true;
    } else {
      this.getTask();
    }
  }

  private getTask() {
    this.isReady = false;
    this.applicationService.getById(this.taskId).pipe(first())
      .subscribe( result => {
        this.task = result;
        this.selectedDate = {
          year: this.task.deadline.getFullYear(),
          month: this.task.deadline.getMonth(),
          day: this.task.deadline.getDay()
        };
        this.isReady = true;
      },
      error => {
        console.log(error);
        this.toastr.error(error);
        this.isReady = true;
      });
  }

  onSubmit(f: NgForm) {
    if (!f.form.valid) {
      this.toastr.info('Please fill in on mandatory fields!');
      return;
    }

    this.toastr.info('Saving...');

    this.task.statusId = 1;
    this.task.deadline = new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.day);
    this.applicationService
      .saveTask(this.task)
      .pipe(first())
      .subscribe(
        data => {
          this.isSaved = true;
          this.toastr.info('Task successfully saved!');
        },
        error => {          
          this.toastr.error('Error!');
          console.log(error);
        }
      );
  }

  submit(myForm: NgForm) {}

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Task description ...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyFull',
        'indent',
        'outdent',
        'heading',
        'fontName',
        'unlink'
      ],
      [
        'fontSize',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode'
      ]
    ]
  }

}
