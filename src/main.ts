import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/compat/app'; 

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  export const firebaseConfig = {
    apiKey: "AIzaSyA0tGdlX2h9NIbMovD0nntjfyOo0LH__ho",
    authDomain: "afdc-47483.firebaseapp.com",
    projectId: "afdc-47483",
    storageBucket: "afdc-47483.appspot.com",
    messagingSenderId: "940700185048",
    appId: "1:940700185048:web:5258386706b6cb43fd02ad",
    measurementId: "G-SVDESWQGEQ"
  };

  try {
    // Inicialize o Firebase
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Erro ao inicializar o Firebase:', error);
  }
  
