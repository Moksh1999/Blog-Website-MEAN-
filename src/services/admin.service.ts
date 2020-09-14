import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { User } from '../classes/user';
import { Loginuser } from 'src/classes/loginuser';
import { Blog } from 'src/classes/blog';

@Injectable({
  providedIn: 'root'
})

export class AdminRegistrationService {


  constructor(private http:HttpClient) { }

  //Does a API Call using POST Http Method
//   public doRegistration(user: User) {
//     return this.http.post("http://localhost:3000/create", user);
//   }

//   //Getting credentials for signup
//   public gettingCredentials()
//   {
//     return this.http.get("http://localhost:3000/users");
//   }

//   public LoginUser(user : Loginuser){
//       return this.http.post("http://localhost:3000/login" , user  )
//   }


//   public setToken(token:string){
//       return localStorage.setItem('token' , token)
//   }
  
//   public getToken(){
//       return localStorage.getItem('token')
//   }

  
//   deleteToken(){
//     localStorage.removeItem('token');
//   }
  
//   getUserPayload(){
//     var token=this.getToken();
//     if(token)
//     {
//       var userPayload=atob(token.split('.')[1]);
//       return JSON.parse(userPayload);
//     }
//     else
//     return null;
//   }

//   isLoggedIn(){
//     var userPayload=this.getUserPayload();
//     if(userPayload)
//     return true;
//     else
//     return false;
//   }

  getUnapprovedBlogs(){
      return this.http.get("http://localhost:3000/admin/unapprovedBlogs");
  }

}

