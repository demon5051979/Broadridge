import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';

export class Task {
  id: any;
  userId: number;
  userName: string;
  createDate: Date;
  deadline: Date;
  timeToComplete: number;
  timeToCompleteString: string;
  name: string;
  description: string;
  priority: number;
  statusId: number;
  statusName: string;

  constructor(
    id: number,
    createDate: Date,
    deadline: Date,
    name: string,
    description: string,
    priority: number,
    statusId: number,
    userId: number,
    statusName: string,
    userName: string,
    timeToComplete: number    
    ) {
      this.id = id;
      this.createDate = createDate;
      this.deadline = deadline;
      this.name = name;
      this.description = description;
      this.priority = priority;
      this.statusId = statusId;
      this.userId = userId;
      this.statusName = statusName;
      this.userName = userName;
      this.timeToComplete = timeToComplete;  

      this.parseTimeToComplete();
  }

  private parseTimeToComplete(): void {

    this.timeToCompleteString = "";

    if (this.timeToComplete) {
        let minutes = Math.floor(this.timeToComplete / 60);
        let hours = 0;
        let days = 0;
        let weeks = 0;
        if (minutes >= 60) {
          hours = Math.floor(minutes / 60);
          minutes = this.timeToComplete - hours * 60;
        }
        if (hours >= 24) {
          days = Math.floor(hours / 24);
          hours = hours - days * 24;
          minutes = 0;
        }
        if (days >= 7) {
          weeks = Math.floor(days / 7);
          days = days - weeks * 7;
          hours = 0;
        }

        this.timeToCompleteString = 
          (weeks > 0 ?  `${weeks} weeks`: "") + 
          (days > 0 ? `${days} days`: "") +
          (hours > 0 ? `${hours} hours`: "") +
          (minutes > 0 ? `${minutes} mins`: "");
    }
  }

  public static mapFromServerObject(jsonObject: Task): Task {
    return new Task(
        jsonObject.id, 
        this.convertToDate(jsonObject.createDate),
        this.convertToDate(jsonObject.deadline),
        jsonObject.name,
        jsonObject.description,
        jsonObject.priority,
        jsonObject.statusId,
        jsonObject.userId,
        jsonObject.statusName,
        jsonObject.userName,
        jsonObject.timeToComplete
    );
  }
  static convertToDate(date: any): Date {
    if (date && typeof date === "string") {
      return new Date(Date.parse(date));
    }

  }

  public static createNewTask(userId: number): Task {
    return new Task(
      uuidv4(), 
      undefined,
      null,
      '',
      '',
      1,
      1,
      userId,
      '',
      '',
      0
    );
  }
}
