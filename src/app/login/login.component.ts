import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
userName:string='';
password:string='';
constructor(private route:Router,private loginService:LoginService){}
login(){
  if(this.loginService.Login(this.userName, this.password)){
    alert("Login Successful");
    this.route.navigate(['/rooms']);
  }
}
}
