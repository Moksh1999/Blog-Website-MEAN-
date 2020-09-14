import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
// import { ApproveComponent } from './approve/approve.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { WriteblogComponent } from './writeblog/writeblog.component';
import { FormsModule } from '@angular/forms';
// import { TokenInterceptorService } from './token-interceptor.service';
import { ApproveComponent } from './approve/approve.component';
import { AuthGuard } from 'src/auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { EditblogComponent } from './editblog/editblog.component';
import { ShowblogComponent } from './showblog/showblog.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomepageComponent,
    ApproveComponent,
    MyblogsComponent,
    WriteblogComponent,
    EditblogComponent,
    ShowblogComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard , {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi :true
  }], 
  bootstrap: [AppComponent]
})
export class AppModule { }


