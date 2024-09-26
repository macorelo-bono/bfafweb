import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface ImageData {
  name: string;
  url: string;
}

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.page.html',
  styleUrls: ['./uploadimage.page.scss'],
})


export class UploadimagePage implements OnInit {

  fileName: string;
  fileSize: string;
  isLoading: boolean;
  isLoaded: boolean;
  percent: number = 0;

  private imageCollection: AngularFirestoreCollection<ImageData>;
  imageFile!: Observable<ImageData[]>;
  imageUpload!: AngularFireUploadTask;

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore,  private router: Router, private ngZone: NgZone, public authservice: AuthService) { 
    this.isLoading = false;
    this.isLoaded = false;
    this.fileSize = '';
    this.fileName = '';
    this.imageCollection = this.firestore.collection<ImageData>('images'); // Inicialize imageCollection corretamente
  }



  ngOnInit() {
  }

  uploadImagetoFirebase(event: any) {
    const file = event.target.files[0];
    console.log(file);

    if (!file.type.startsWith('image')) {
      console.error("File is not an Image");
      return;
    }

    const path = `loginUploads/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);

    // Faz o upload da imagem para o Firebase Storage
    this.imageUpload = this.storage.upload(path, file);

    // Observa o estado do upload
    this.imageUpload.snapshotChanges().subscribe(snapshot => {
      if (snapshot && snapshot.bytesTransferred && typeof snapshot.totalBytes === 'number') {
        this.isLoading = true;
        this.ngZone.run(() =>{ 
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.percent = progress;
        })
      } 
      if (snapshot && snapshot.state === 'success') {
        // Quando o upload é bem-sucedido, obtém a URL de download da imagem
        fileRef.getDownloadURL().subscribe(url => {
          console.log('File available at', url);
          // Atualiza ou cria o perfil do usuário no Firestore com a URL da imagem
          const userDocRef = this.firestore.doc(`profile/${this.authservice.getUserUid()}`);
          userDocRef.get().subscribe(doc => {
            if (doc.exists) {
              // Se o documento existir, atualize-o
              userDocRef.update({ photoUrl: url }).then(() => {
                console.log('Photo URL updated in user profile in Firestore');
              }).catch(error => {
                console.error('Error updating photo URL in user profile in Firestore:', error);
              });
            } else {
              // Se o documento não existir, crie-o
              userDocRef.set({ photoUrl: url }).then(() => {
                console.log('Photo URL added to user profile in Firestore');
              }).catch(error => {
                console.error('Error adding photo URL to user profile in Firestore:', error);
              });
            }
          });
  

          // Salva informações sobre a imagem no Firestore
          const imageData: ImageData = {
            name: file.name,
            url: url
          };
          this.imageCollection.add(imageData).then(() => {
            console.log('Image data saved to Firestore');
          }).catch(error => {
            console.error('Error saving image data to Firestore:', error);
          });
        }); 
      }
    });

    // Lida com erros de upload
    this.imageUpload.catch(error => {
      console.error('Error uploading file:', error);
    });

  }

  goToNextPage(){
    this.router.navigate(['/tabs']);
  }

}
