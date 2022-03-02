import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(form):void{
    this.authService.login(form.value).subscribe(
      (res:any) =>{
        if(res.dataUser.status === 200){
          sessionStorage.setItem("emailUser", res.dataUser.email);
          this.router.navigateByUrl('/auth');
        }

      }
    );
  }


}
