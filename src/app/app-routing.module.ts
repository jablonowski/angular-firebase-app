import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
        authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {
    path: 'create-book',
    component: CreateBookComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
        authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'books/:id',
    component: BookComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
        authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {
    path: '**',
    redirectTo: '/'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
