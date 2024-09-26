import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {

  // Definição das mensagens de validação para os campos do formulário
  validationMessages = {
    names: [{type: "required", message:"Por favor, digite seu nome completo"}],
    phone: [
      {type: "required", message:"Por favor, digite seu celular"},
      {type: "pattern", message:"O formato do telefone está incorreto. Tente novamente"}
    ],
    email: [
      {type: "required", message:"Por favor, digite seu email"},
      {type: "pattern", message:"O tipo de email está incorreto. Tente novamente"}
    ],
    password: [
      {type: "required", message: "Por favor, digite sua senha"},
      {type: "minLength", message: "Senha deve ter pelo menos 5 dígitos"}
    ],
    prof: [
      {type: "required", message: "Por favor, digite sua profissão"},
      {type: "minLength", message: "Profissão deve ter pelo menos 5 dígitos"}
    ]
  }
  
  validationFormUser: FormGroup; // FormGroup para validação do formulário
  loading: any; // Variável para o controle do alerta de carregamento

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, 
              public loadingCtrl: LoadingController, private alertCtrl: AlertController, private navCtr: NavController) { 

    this.validationFormUser = this.formBuilder.group({
      names: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      prof: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    this.validationFormUser = this.formBuilder.group({
      names: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),//, Validators.pattern('/^\(\d{2}\)\d{5}-\d{4}$/')
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      prof: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  registerUser(value: any) {
    this.showalert();
    this.authService.userRegistration(value).then(response => {
      if (response.user) {
        this.loading.dismiss();
        this.router.navigate(['loginscreen']);
      }
    }).catch(error => {
      this.loading.dismiss();
      this.errorLoading(error.message);
    });
  }

  async errorLoading(message: any) {
    const alert = await this.alertCtrl.create({
      header: "Erro registrando",
      message: message,
      buttons: [{
        text: 'ok',
        handler: () => {
          this.navCtr.navigateBack(['/signup']);
        }
      }]
    });
    await alert.present();
  }

  async showalert() {
    this.loading = await this.loadingCtrl.create({
      message: "Por favor, aguarde...",
    });
    await this.loading.present();
  }
}