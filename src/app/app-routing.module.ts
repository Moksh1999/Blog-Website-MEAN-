import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { WriteblogComponent } from './writeblog/writeblog.component';
// import { AuthGuard } from 'src/auth/auth.guard';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ApproveComponent } from './approve/approve.component';
import { AuthGuard } from 'src/auth.guard';
import { EditblogComponent } from './editblog/editblog.component';
import { ShowblogComponent } from './showblog/showblog.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
 
  {path : 'login' , component : SignupComponent},
  {path : 'home' , component : HomepageComponent, canActivate:[AuthGuard] },    // ,canActivate:[AuthGuard]
  {path : 'write' , component : WriteblogComponent ,canActivate:[AuthGuard]},
  {path : 'myblogs' , component : MyblogsComponent,canActivate:[AuthGuard] },
  {path : 'approve' , component : ApproveComponent ,canActivate:[AuthGuard] },
  {path : 'editblog/:id' , component : EditblogComponent ,canActivate:[AuthGuard]},
  // {path : 'showblog' , component : ShowblogComponent , canActivate:[AuthGuard]},
  {path  : 'showblog/:id' , component : ShowblogComponent , canActivate:[AuthGuard]},
  {path : "" , redirectTo : 'login' , pathMatch:'full'},
  {path : '**' , component : NotfoundComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
