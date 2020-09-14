import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from 'src/services/user-register.service';
import { Router, Route } from '@angular/router';
import { BlogService } from 'src/services/blog.service';
import { Comment, ThrowStmt } from '@angular/compiler';
import { CommentStructure } from 'src/classes/commentStructure';
import { Location}  from '@angular/common'
import { Blog } from 'src/classes/blog';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  demos:Blog[]=[];
  approvedBlogs : any;
  array : any;
  msg: any; 
  newComment : CommentStructure = new CommentStructure("");
  cmt: boolean = false;
  replycomment : CommentStructure = new CommentStructure("");
  

  constructor(private service : UserRegistrationService , 
     private blogSer : BlogService ,
     private router : Router ) { }

  ngOnInit() {
    let response = this.service.getApprovedBlogs()
    response.subscribe((data)=>{
      this.approvedBlogs = data
      this.array = this.approvedBlogs.All_Blogs
     
    // console.log(this.array)

    for(let i=0;i<this.array.length;i++){
      let credential={
        id:this.array[i]._id,
        title:this.array[i].title,
        content:this.array[i].content.substring(0,150)+'.....'
      }
      this.demos.push(credential);
    }
    // console.log(this.demos)
    })

  }

  getUrl()
  {
    return "url('../../assets/4.jpg')";
  }

  logout(){
    this.router.navigateByUrl('/login')
    this.service.deleteToken()
  }


  docomment(id : String){
    // console.log(id+" "+this.newComment.content)

    let response=this.service.createComment(id,this.newComment)
    response.subscribe((data)=>{
      // console.log(data)
    })
    
   
  }


  tocomment(){ 
    this.cmt = true;
    return true;
  }

  reply(blogid : String , commentid : String){
    // console.log(blogid +" "+ commentid+" "+this.replycomment.content)
    let response = this.service.createReply(blogid , commentid , this.replycomment)
    response.subscribe((data)=>{

    })
  }

  ReadBlog(id){
    this.service.sendBlogForEdit(id)
    // console.log(id)
    this.router.navigateByUrl('/showblog')
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
