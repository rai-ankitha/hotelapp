import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
isLoggedIn:boolean=false;
isAdmin:boolean=false;
  constructor() { }
  Login(userName:string,password:string){
    if(userName==="admin@gmail.com" && password==="admin"){
      alert("Login Successful");
      this.isLoggedIn=true;
      this.isAdmin=true;
    }
    if(userName==="user@gmail.com" && password==="user"){
      this.isLoggedIn=true;
      this.isAdmin=false;
    }
    return this.isLoggedIn;             
  }
}
