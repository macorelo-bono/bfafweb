import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Papa } from 'ngx-papaparse';
import { saveAs } from 'file-saver';

interface Questionnaire {
  responses: { [key: string]: string };
  timestamp: { seconds: number; nanoseconds: number };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileName: any;
  profileImageUrl: any;
  profileEmail: any;
  userPhone: any;
  userProf: any;

  

  constructor(private database: AngularFirestore, public authservice: AuthService, private navCtrl: NavController, private afAuth: AngularFireAuth, private authService: AuthService, private papa: Papa) { }

  async ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("AUTH_USER", user);

      if (user) {
        const userUid = this.authservice.getUserUid();
        if (!userUid) {
          console.error("User UID is invalid");
          return;
        }

        const profileDoc = this.database.doc(`/profile/${userUid}`).valueChanges();
        profileDoc.subscribe({
          next: (profile: any) => {
            if (profile) {
              console.log("PROFILE:", profile);
              this.profileName = profile.name;
              this.profileEmail = profile.email;
              this.profileImageUrl = profile.photoUrl || '/assets/images/avatar.png';
            } else {
              console.log("Perfil não encontrado");
            }
          },
          error: (error) => {
            console.error("Erro ao recuperar perfil:", error);
          }
        });

        const userDoc = this.database.doc(`/users/${userUid}`).valueChanges();
        userDoc.subscribe({
          next: (user: any) => {
            if (user) {
              console.log("USER:", user);
              this.userPhone = user.phone;
              this.userProf = user.prof;
            }
          },
          error: (error) => {
            console.error("Erro ao recuperar usuário:", error);
          }
        });
      }
    });
  }

  irAlterarImagem() {
    this.navCtrl.navigateForward('/uploadimage');
  }
  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }

  async exportCSV() {
    try {
      const data = await this.authService.fetchUserQuestionnaires();

      if (!data) {
        console.error('No data found');
        return;
      }

      const { userProfile, questionnaires } = data;
      const formattedData = questionnaires.map((questionnaire: any) => {
        const responseObject: { [key: string]: string } = {};
        for (const [key, value] of Object.entries(questionnaire.responses)) {
          responseObject[key] = String(value); // Ensure the value is a string
        }

        return {
          Nome: userProfile?.name ?? '',
          Email: userProfile?.email ?? '',
          Timestamp: new Date(questionnaire.timestamp?.seconds * 1000).toLocaleString(), // Assuming Firestore timestamp
          ...responseObject
        };
      });

      // Extract all possible keys from formattedData
      const allKeys = formattedData.reduce((keys, obj) => {
        Object.keys(obj).forEach(key => keys.add(key));
        return keys;
      }, new Set<string>());

      // Convert Set to Array and sort it
      const header = Array.from(allKeys).sort();

      // Ensure each object contains all keys from the header
      const completeData = formattedData.map(entry => {
        const completeEntry: { [key: string]: string } = {};
        header.forEach(key => {
          completeEntry[key] = (entry as { [key: string]: string })[key] ?? ''; // Add empty string for missing keys
        });
        return completeEntry;
      });

      // Transform data to match the structure expected by PapaParse
      const csvData = completeData.map(entry => header.map(key => entry[key]));

      // Add headers to the data
      csvData.unshift(header);

      const csv = this.papa.unparse(csvData, {
        quotes: false, // Removes quotes from around the fields
        delimiter: ";", // Defines delimiter for CSV
        header: true // Includes headers in the CSV file
      });

      const csvWithNewLines = csv.replace(/\r?\n/g, '\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'questionnaires.csv');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'questionnaires.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  }
}
