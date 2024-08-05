import { Injectable } from '@angular/core';
import {UserDto} from "../../shared/models/user-dto.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../../shared/models/user.model";

@Injectable()
export class UserService {
  SESSION_STORAGE_USER_KEY = 'currentUser';
  API_URL = 'http://localhost:8000/users';

  constructor(private http: HttpClient) { }

  createUser(user: UserDto): void {
    this.http.post(this.API_URL, user)
      .subscribe(() => this.setUserToSessionStorage(user));
  }

  signIn(user: UserDto): void {
    this.setUserToSessionStorage(user);
  }

  async isUserExists(user: UserDto): Promise<boolean> {
    const options = { params: new HttpParams().set('email', user.email) };
    const data = await this.http.get<User[]>(this.API_URL, options).toPromise();

    return !!data && data[0]?.email != null && data[0]?.password == user.password;
  }

  async isUserWithEmailExists(email: string) {
    const options = { params: new HttpParams().set('email', email) };
    const data = await this.http.get<User[]>(this.API_URL, options).toPromise();

    return !!data && data[0]?.email != null;
  }

  private setUserToSessionStorage(user: UserDto): void {
    sessionStorage.setItem(this.SESSION_STORAGE_USER_KEY, JSON.stringify(user));
  }

  isUserLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.SESSION_STORAGE_USER_KEY);
  }

  logOut(): void {
    sessionStorage.removeItem(this.SESSION_STORAGE_USER_KEY);
  }

  getCurrentUser(): UserDto | null {
    const user = sessionStorage.getItem(this.SESSION_STORAGE_USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
