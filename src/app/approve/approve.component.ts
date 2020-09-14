import { Component, OnInit } from '@angular/core';
import { AdminRegistrationService } from 'src/services/admin.service';
import { UserRegistrationService } from 'src/services/user-register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  blogs: any;
  array :any;
  checkId: String;
  id: String;
  constructor(private service : UserRegistrationService, private router : Router) { }

  ngOnInit() {
    let response = this.service.getUnapprovedBlogs()
    response.subscribe((data)=>{
      this.blogs = data;
      this.array = this.blogs.blogs
      //console.log(this.array) 
    })
  }

  grantApproval(id : String){
    this.id = id
    let response = this.service.approveBlog(this.id)
    response.subscribe((data)=>{
     // console.log(data)
     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Approved',
      showConfirmButton: false,
      timer: 1500
      })

      setTimeout(()=>{
        this.ngOnInit()
      },2000)
    }) 
    // this.router.navigateByUrl('/approve')
  }

  logout(){
    this.service.deleteToken()
    this.router.navigateByUrl('/login')
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
