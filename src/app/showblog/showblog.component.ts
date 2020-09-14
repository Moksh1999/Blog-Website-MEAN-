import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from 'src/services/user-register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from 'src/classes/blog';
import { CommentStructure } from 'src/classes/commentStructure';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-showblog',
  templateUrl: './showblog.component.html',
  styleUrls: ['./showblog.component.css']
})
export class ShowblogComponent implements OnInit {
  blogid;
  blog: any;
  showingBlog : Blog = new Blog("","");
  array: any;
  comments: any;
  newComment : CommentStructure = new CommentStructure("");
  show: boolean = false;
  replycomment : CommentStructure = new CommentStructure("");
  hideme : Boolean = false;
  error1: string;
  error2: string;

  constructor(private service : UserRegistrationService , private router : Router , private activatedRoute : ActivatedRoute) { }



  ngOnInit() {
 
    this.blogid = this.activatedRoute.snapshot.params;
    // console.log(this.blogid)
    let response=this.service.getBlogByID(this.blogid.id) 
    response.subscribe((data)=>{
      this.blog = data
      this.showingBlog = this.blog
      // console.log(this.showingBlog)
      this.array = this.showingBlog
      this.comments = this.array['comments']
      // console.log(this.comments)
    })
  }

  doComment(){
    if(this.newComment.content){
      let response = this.service.createComment(this.blogid.id,this.newComment)
      response.subscribe((data)=>{
        this.newComment.content = ""
        this.ngOnInit()
      }) 
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out comment field first'
      })
    }

  }

  toggle(){
    this.show = !this.show  
  }

  reply(commentid : String){
    // console.log(blogid +" "+ commentid+" "+this.replycomment.content)
    if(this.replycomment.content){
      let response = this.service.createReply(this.blogid.id , commentid , this.replycomment)
      response.subscribe((data)=>{
        this.ngOnInit()
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out reply field first'
      })
    }
  }


    //ROUTING FUNCTIONS
logout(){
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
