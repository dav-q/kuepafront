import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';




const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate : [AuthGuard] },
  // { path: 'home', component: HomeComponent},


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'my-account', component: MyAccountComponent, canActivate : [AuthGuard] },
  { path: '**', redirectTo: 'login'},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
