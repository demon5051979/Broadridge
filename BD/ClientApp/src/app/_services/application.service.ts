import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { Task } from '../_models/task';
import { map } from 'rxjs/operators';

@Injectable()
export class ApplicationService {
  baseUrl: any;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getTasks(statusId: number) {
    return this.http.get<Task[]>(
      `${this.baseUrl}api/Task/GetAll/${statusId}`)
      .pipe(map(response => response.map(item => Task.mapFromServerObject(item))));
  }

  getTasksPagination(statusId: number, pageNumber: number) {
    const paginationInfo = {statusId: statusId, pageNumber: pageNumber};
    return this.http.post<Task[]>(
      `${this.baseUrl}api/Task/GetTasksPagination/`, paginationInfo)
      .pipe(map(response => response.map(item => Task.mapFromServerObject(item))));
  }

  getById(id: string) {
    return this.http.get<Task>(
      `${this.baseUrl}api/Task/GetById/${id}`)
      .pipe(map(response => Task.mapFromServerObject(response)));
  }

  saveTask(task: Task) {
    return this.http.post(`${this.baseUrl}api/Task/SaveTask`, task);
  }

  changeTaskStatus(task: Task) {
    return this.http.post(`${this.baseUrl}api/Task/ChangeStatus`, task);
  }
}