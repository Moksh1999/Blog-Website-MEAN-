import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import { Loginuser } from 'src/classes/loginuser';
import { Blog } from 'src/classes/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  //Does a API Call using POST Http Method
  public doAddBlog(blog: Blog) {
    return this.http.post("http://localhost:3000/blog/create", blog);
  }

  //Getting credentials for signup
  public getAllblog()
  {
    return this.http.get("http://localhost:3000/blog/Allblogs");
  }

}

