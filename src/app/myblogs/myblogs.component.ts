import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from 'src/services/user-register.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  blogs : any;

  array :any;
  id: String;
  constructor(private userservice : UserRegistrationService , private router : Router) { }

  ngOnInit() {
    let response = this.userservice.getAllblog();
    response.subscribe((data) => {
    this.blogs=data;
    // console.log(this.blogs)
    this.array = this.blogs.blogs
    // console.log(this.array[0].approved)
  })
  }

 
  deleteBlog(id :String){
    this.id = id
    let response = this.userservice.deleteBlog(this.id)
    response.subscribe((data)=>{
      //console.log(data)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    })

    setTimeout(()=>{
      this.ngOnInit()
    },2000)
    // this.router.navigateByUrl('/myblogs')

  }


  editBlog(id : String){
    this.userservice.sendBlogForEdit(id)
    this.router.navigateByUrl('/editblog')
    this.ngOnInit()

  }


  //ROUTING FUNCTIONS
  logout(){
    this.userservice.deleteToken()
    this.router.navigateByUrl('/login')
  }
  
doLogout(){
  this.userservice.deleteToken();
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
