import { Injectable,Injector, OnInit } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import { UserRegistrationService } from 'src/services/user-register.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor,OnInit{

  check : any;
  constructor(private injector : Injector , private service : UserRegistrationService) { }

  ngOnInit(){
    this.check=this.service.getToken()
    console.log(this.check)
  }

  intercept(req,next){
    let userService = this.injector.get(UserRegistrationService)
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : `${userService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
} 
