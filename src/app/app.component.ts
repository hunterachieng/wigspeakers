import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wigspeakers';
  user: User = null;
  why = false;
  isUser = false;
  constructor(public fAuth: AngularFireAuth) {
    this.fAuth.auth.onAuthStateChanged(u => {
      if (u) {
        this.user = u;
        this.isUser = true;
      } else {
        this.isUser = false;
      }
    });
  }

  logOut(){
    this.fAuth.auth.signOut();
  }
}
