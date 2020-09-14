import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserRegistrationService } from './services/user-register.service';


@Injectable({ 
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate {

  constructor(private service : UserRegistrationService , private router: Router){}
  canActivate() : boolean {
    if(this.service.isLoggedIn()){
      return true
    }
    else{
      this.router.navigateByUrl('/login')
      return false
    }
  }

  }
  

