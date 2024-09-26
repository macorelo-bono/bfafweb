import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage {
  email: string = '';

  constructor(private authService: AuthService, private toastController: ToastController) {}

  async resetPassword() {
    try {
      await this.authService.resetPassword(this.email);
      this.email = '';
      this.presentToast('Um e-mail de redefinição de senha foi enviado.');
    } catch (error) {
      this.presentToast('Erro ao redefinir senha. Por favor, tente novamente.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}