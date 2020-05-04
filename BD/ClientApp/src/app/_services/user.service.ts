import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable()
export class UserService {
  baseUrl: any;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

    getAll() {
      return this.http.get<User[]>(`${this.baseUrl}/users`);
    }

    getById(id: number) {
      return this.http.get(`${this.baseUrl}/users/` + id);
  }

    getByEmail(email: string) {
      return this.http.get(`${this.baseUrl}/users/GetByEmail/` + email);
    }

    register(user: User) {
      return this.http.post(`${this.baseUrl}/users/register`, user);
    }

    update(user: User) {
      return this.http.put(`${this.baseUrl}/users/` + user.id, user);
    }

    delete(id: number) {
      return this.http.delete(`${this.baseUrl}/users/` + id);
    }
}
