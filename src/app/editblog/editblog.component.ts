import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from 'src/services/user-register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from 'src/classes/blog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.css']
})
export class EditblogComponent implements OnInit {
  blogid;
  blog: Object;
  edittedblog : Blog = new Blog("","");
  msg : any;
  

  constructor(private service : UserRegistrationService , private router : Router, private activated : ActivatedRoute) { }

  ngOnInit() {
    this.blogid = this.activated.snapshot.params;

    let response=this.service.getBlogByID(this.blogid.id)
    response.subscribe((data)=>{
      this.blog = data
      this.edittedblog = this.blog
      // console.log(this.blog)
      // console.log(this.edittedblog)
      // this.msg=this.array.title
    }) 
  } 

  updatEBlog(){
    let response = this.service.updateBlog(this.blogid.id,this.edittedblog)
    response.subscribe((data)=>{
      // console.log(data)
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
   
    // console.log(this.edittedblog)
    this.ngOnInit()

  }


  //Routing 
  logout(){
    this.service.deleteToken()
    this.router.navigateByUrl('/login')
  }
  
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
