import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form): void {
    this.authService.register(form.value).subscribe(res => {
      sessionStorage.setItem("emailUser", res.dataUser.email);
      this.router.navigateByUrl('/auth/solicitud');
    });
  }

}
