import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/classes/blog';
// import { BlogService } from 'src/services/blog.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserRegistrationService } from 'src/services/user-register.service';


@Component({
  selector: 'app-writeblog',
  templateUrl: './writeblog.component.html',
  styleUrls: ['./writeblog.component.css']
})
export class WriteblogComponent implements OnInit {

  blog : Blog = new Blog("","");
  message: Object;
  blogs: Object;
  array : any
  editBlogID: String;
  error1: string;


  constructor(private userservice : UserRegistrationService, private router :Router) { }

  ngOnInit() {
    let response = this.userservice.getAllblog()
    response.subscribe((data)=>{
      this.blogs = data
      this.array = this.blogs
     // console.log(this.array)
    })

    let demo = this.userservice.getBlogForEdit()  
    this.editBlogID = demo
    // console.log(this.editBlogID)
  }


  blogAdd(form){
    if(form.value.title == "" || form.value.content==""){
      alert("Invalid Blog details")
    }
    else{
      this.addingBlog()
    }
  }

  addingBlog(){
    // console.log(this.blog);
    if(this.blog['title'] && this.blog['content']){
      let response = this.userservice.doAddBlog(this.blog);
      response.subscribe(data=>{
        this.message = data;
        // console.log(data);
      })
       
  Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
  })

  setTimeout(()=>{
    this.router.navigateByUrl('/myblogs')
    },2000)
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You didn\'t write anything'
      })    
    }

  }

  

    //ROUTING FUNCTIONS
  logout(){
    this.router.navigateByUrl('/login')
    this.userservice.deleteToken()
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
 