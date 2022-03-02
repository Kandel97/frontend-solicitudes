import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor( 
  private auhtService:AuthService,
  private router:Router
){}

  canActivate(): boolean{
    console.log('si')
    if (this.auhtService.loggedIn()){
      return true;
    }
    console.log('no')
    this.router.navigate(['auth/login'])
    return false;
  }
  
}
