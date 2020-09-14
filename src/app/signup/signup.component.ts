import { Component, OnInit } from '@angular/core';
import { User } from 'src/classes/user';
import { UserRegistrationService } from 'src/services/user-register.service';
import { Router } from '@angular/router';
import { Loginuser } from 'src/classes/loginuser';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user : User = new User("","","");
  user2 : Loginuser = new Loginuser("","");
  message:any;
  credentials :any;
  flag: number;
  demotoken : any;
  check : String;
  admin: Object;
  error1 : String;

  constructor(private service : UserRegistrationService , private router : Router) { }

  ngOnInit() {
const signupButton = document.getElementById('signup-button'),
loginButton = document.getElementById('login-button'),
signupButtonMb = document.getElementById('signup-button-mb'),
loginButtonMb = document.getElementById('login-button-mb'),
forgetButton = document.getElementById('forget-button'),
userForms = document.getElementById('user_options-forms'),
loginForm = document.getElementById('user_forms-login'),
signUpForm = document.getElementById('user_forms-signup');

// Add event listener to the "Sign Up" button
signupButton.addEventListener('click', () => {
userForms.classList.remove('show-forgotPass');
userForms.classList.remove('bounceRight');
userForms.classList.add('bounceLeft');  
}, false)

// Add event listener to the "Login" button
loginButton.addEventListener('click', () => {
userForms.classList.remove('show-forgotPass');
userForms.classList.remove('bounceLeft');
userForms.classList.add('bounceRight');
}, false)

// Add event listener to the "Forget Password" button
forgetButton.addEventListener('click', () => {
userForms.classList.add('show-forgotPass');
// userForms.classList.add('bounceRight');
// userForms.classList.remove('bounceLeft');
userForms.classList.remove('show-login');
userForms.classList.remove('show-signup');  
}, false)

// Add event listener to the "Signup" button mobile
signupButtonMb.addEventListener('click', () => {
userForms.classList.remove('show-forgotPass');
userForms.classList.remove('show-login');
userForms.classList.add('show-signup'); 
}, false)

// Add event listener to the "Login" button mobile
loginButtonMb.addEventListener('click', () => {
userForms.classList.remove('show-forgotPass');
userForms.classList.add('show-login');  
userForms.classList.remove('show-signup');
}, false)

let response = this.service.gettingCredentials();
response.subscribe((data) => {
this.credentials=data;
//console.log(this.credentials)
})

let admins = this.service.getAdmins();
admins.subscribe((data)=>{
  this.admin = data
  //console.log(this.admin)
})
}


signupUser(form){
  if(form.value.email == "" && form.value.password == "")
  {
   alert("Pls enter all the fields");
  }
  else
  {
    this.registerProcess();
    this.router.navigateByUrl('/login');
  }
}

registerProcess(){
  let response = this.service.doRegistration(this.user);
  response.subscribe(data=>{
    this.message = data;
    //console.log(data);
  })
}

loginUser(form : NgForm)
{
  // console.log(this.user2)
  if(form.value.email == "" && form.value.password == "")
  {
   alert("Pls enter all the fields");
  }
  else if(this.user2.email == "admin"){
    this.adminlogin()
  }
  else{
    // console.log("do")
    this.doLogin();
  }
}

public doLogin()
{

  let response = this.service.LoginUser(this.user2);
  response.subscribe(data=>{
  
  const checkToken = data;
  localStorage.setItem('token',checkToken['token'])
 
  this.router.navigateByUrl('/home');
  },
  err=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid credentials'
  })
  })
}

public adminlogin(){
  let response = this.service.loginAdmin(this.user2)
  response.subscribe(data=>{
    const adminToken = data;
    localStorage.setItem('token',adminToken['token'])
    this.router.navigateByUrl('/approve')
  })
 
}


//ROUTING FUNCTIONS
doLogout(){
  this.service.deleteToken();
   this.router.navigateByUrl('/login');
}

toHome(){
  this.router.navigateByUrl('/home')
}

toWrite(){
  this.router.navigateByUrl('/write')
}

toMyblogs(){
  this.router.navigateByUrl('/myblogs')
}

}