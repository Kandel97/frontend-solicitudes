import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3001';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient,
    private router: Router) { }

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            this.setIsAdmin(res.dataUser.admin);
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            console.log(res);
            this.setIsAdmin(res.dataUser.admin);

            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN") as string;
    }
    return this.token;
  }
  //comprobar si el token existe
  loggedIn() {
    return !!(localStorage.getItem("ACCESS_TOKEN"));
  }

  public setIsAdmin(admin: boolean): void {
    sessionStorage.setItem("admin", String(admin));
  }

  public getIsAdmin(): boolean {
    return sessionStorage.getItem("admin") === "true" ? true : false;
  }

}
