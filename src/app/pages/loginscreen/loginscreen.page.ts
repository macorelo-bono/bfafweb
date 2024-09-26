import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {
  validationUserMessage = {
    email: [
      { type: "required", message: "Por favor, digite um email" },
      { type: "pattern", message: "O email está incorreto. Tente novamente" }
    ],
    password: [
      { type: "required", message: "Por favor, digite uma senha" },
      { type: "minlength", message: "A senha deve ter 5 ou mais caracteres" }
    ]
  };

  validationFormUser: FormGroup;
  loginErrorMessage: string = ''; // Campo para mensagem de erro

  constructor(
    public formBuilder: FormBuilder,
    public authservice: AuthService,
    private router: Router,
    private fireStore: AngularFirestore,
    private nav: NavController
  ) {
    this.validationFormUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  async LoginUser(value: any) {
    try {
      const resp = await this.authservice.loginFireauth(value);
      console.log(resp);

      this.authservice.setUser({
        username: resp.user.displayName,
        uid: resp.user.uid
      });

      if (resp.user) {
        const userProfile = this.fireStore.collection('profile').doc(resp.user.uid);
        userProfile.get().subscribe(result => {
          if (result.exists) {
            this.nav.navigateForward(['tabs']);
          } else {
            userProfile.set({
              name: resp.user.displayName,
              email: resp.user.email
            }).then(() => {
              console.log('Profile document created with ID:', resp.user.uid);
              this.nav.navigateForward(['uploadimage']);
            }).catch(error => {
              console.error('Error creating profile document:', error);
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
      this.loginErrorMessage = "Email ou senha incorretos. Tente novamente."; // Defina a mensagem de erro
    }
  }
}
