import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { User } from '../classes/user';
import { Loginuser } from 'src/classes/loginuser';
import { Blog } from 'src/classes/blog';
import { CommentStructure } from 'src/classes/commentStructure';

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  Sentid: String;


  constructor(private http:HttpClient) { }

  //FOR CREATE USER
  public doRegistration(user: User) {
    return this.http.post("http://localhost:3000/create", user);
  }

  
  public gettingCredentials()
  {
    return this.http.get("http://localhost:3000/users");
  }

  //LOGIN USER
  public LoginUser(user : Loginuser){
      return this.http.post("http://localhost:3000/login" , user  )
  }

//TO SET TOKEN IN LOCAL STORAGE
  public setToken(token:string){
      return localStorage.setItem('token' , token)
  }
  
  //TO GET TOKEN FROM LOCAL STORAGE
  public getToken(){
      return localStorage.getItem('token')
  }

  //TO DELETE TOKEN
  deleteToken(){
    localStorage.removeItem('token');
  }
  
  getUserPayload(){
    var token=this.getToken();
    if(token)
    {
      var userPayload=atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
    return null;
  }

  loggedin(){
    var userPayload = this.getUserPayload();
    if(userPayload){
      return true
    }
    else{
      return false
    }
  } 

  //CHECK IF LOGGED IN
  isLoggedIn(){
    return !!localStorage.getItem('token')
  } 


  //BLOGS
  public doAddBlog(blog: Blog) {
    return this.http.post("http://localhost:3000/blog/create", blog);
  }

  //Getting All Blogs
  public getAllblog()
  {
    return this.http.get("http://localhost:3000/blog/Allblogs");
  }

  //Get blogs of particular user
  public blogOfUser(){
    return this.http.get("http://localhost:3000/blog/blogsOfUser")
  }

//TO DELETE A BLOG
  public deleteBlog(id : String){
    return this.http.delete("http://localhost:3000/blog/"+id)
  }

  //TO GET APPROVED BLOGS
  public getApprovedBlogs(){
    return this.http.get("http://localhost:3000/admin/allBlogs")
  }

  //TO GET UNAPPROVED BLOGS
  public getUnapprovedBlogs(){
    return this.http.get("http://localhost:3000/admin/unapprovedBlogs");
}

//GET ADMINS
  public getAdmins(){
    return this.http.get("http://localhost:3000/Admin")
  }

  //LOGIN ADMIN
  public loginAdmin(user : Loginuser){
    return this.http.post("http://localhost:3000/admin/login" , user  )
}

//TO APPROVE A BLOG
  public approveBlog(id : String){
    return this.http.get("http://localhost:3000/admin/approve/"+id)
  }

  //TO SEND ID TO EDIT BLOG
  public sendBlogForEdit(id : String){
    this.Sentid = id
  }

  //TO GET ID FOR EDITTING BLOG
  public getBlogForEdit(){
    return this.Sentid
  }

  //GET BLOG BY ID
  public getBlogByID(id:String){
    return this.http.get("http://localhost:3000/blog/"+id)
  }

//UPDATE BLOG
  public updateBlog(id : String , blog : Blog){
    // console.log(blog)
    return this.http.patch("http://localhost:3000/blog/"+id , blog)
  }

  //CREATE A COMMENT ON BLOG
  public createComment(id:String,comment:CommentStructure){
    return this.http.post("http://localhost:3000/comments/"+id,comment)
  }

  //CREATE A REPLY ON COMMENT
  public createReply(blogID : String , commentID : String, reply : CommentStructure){
    return this.http.post("http://localhost:3000/reply/"+blogID+"/"+commentID , reply)
  }

}

