import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

export interface UserID{
  username: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user: UserID | null = null;

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private afAuth: AngularFireAuth) {

    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      console.log('Persistence set to LOCAL');
    })
    .catch((error) => {
      console.error('Error setting persistence: ', error);
    });
  }

  setUser(user:UserID){
    this.user = user;
  }

  getUserUid(): string | null {
  const currentUser = firebase.auth().currentUser;
  return currentUser ? currentUser.uid : null;
}

  loginFireauth(value: any) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      )
    })
  }

  async userRegistration(value: any) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(value.email, value.password);

    await userCredential.user?.updateProfile({
      displayName: value.names
    });

    await this.firestore.collection('users').doc(userCredential.user?.uid).set({
      email: value.email,
      phone: value.phone,
      prof: value.prof,
      names: value.names
    });

    await this.firestore.collection('profile').doc(userCredential.user?.uid).set({
      name: value.names,
      email: value.email,
      photoUrl: '/assets/images/avatar.png' 
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
}

  async saveAllResponses(responses: { [key: string]: string }) {
    try {
        const user = await this.afAuth.currentUser;
        if (user) {
            const questionnaireRef = this.firestore
                .collection('users')
                .doc(user.uid)
                .collection('questionnaires')
                .doc();
                
            return questionnaireRef.set({
                responses,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            throw new Error('User not authenticated');
        }
    } catch (error) {
        console.error('Error saving responses: ', error);
        throw error;
    }
  }
  
  async fetchUserQuestionnaires() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userProfileDoc = await firstValueFrom(this.firestore.collection('profile').doc(user.uid).get());
        if (!userProfileDoc.exists) {
          throw new Error('User profile does not exist');
        }
        const userProfile = userProfileDoc.data() as { name: string, email: string } | undefined;
  
        if (!userProfile) {
          throw new Error('User profile is empty');
        }
  
        const questionnairesSnapshot = await firstValueFrom(this.firestore.collection('users')
          .doc(user.uid)
          .collection('questionnaires')
          .get());
  
        if (questionnairesSnapshot.empty) {
          throw new Error('No questionnaires found');
        }
  
        const questionnaires = questionnairesSnapshot.docs.map(doc => doc.data());
  
        return {
          userProfile,
          questionnaires
        };
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      console.error('Error fetching questionnaires: ', error);
      throw error;
    }
  }
  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw error; 
    }
  }
}
