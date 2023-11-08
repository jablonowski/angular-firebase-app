import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from "./service/user.service";
import { AuthTokenService } from "./service/auth-token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-firebase-app';

  constructor(
    public user: UserService,
    private token: AuthTokenService) {

  }

  ngOnInit() {

  }

  logout() {
    this.user.logout();
  }
}
