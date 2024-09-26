import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth) {}

    ngOnInit() {
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          console.log('User is logged in');
        } else {
          console.log('User is not logged in');
          this.navCtrl.navigateRoot('/login'); 
        }
      });
    }
}
