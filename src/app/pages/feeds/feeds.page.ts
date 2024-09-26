import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedsPage implements OnInit {

  form: FormGroup;
  
  questao1!: string;
  questao2!: string;
  questao3!: string;
  questao4!: string;
  questao5!: string;
  questao6!: string;
  questao7!: string;
  questao8!: string;
  questao9!: string;
  questao10!: string;
  questao11!: string;
  questao12!: string;
  questao13!: string;
  questao14!: string;
  questao15!: string;
  questao16!: string;
  questao17!: string;
  questao18!: string;
  questao19!: string;
  questao20!: string;
  questao21!: string;
  questao22!: string;
  questao23!: string;
  questao24!: string;
  questao25!: string;
  questao26!: string;
  questao27!: string;
  questao28!: string;
  questao29!: string;
  questao30!: string;
  questao7idade: string = '';
  questao8idade: string = '';

  pontuacaoTotal: {[key: string]: number} = {
    questao1: 0,
    questao2: 0,
    questao3: 0,
    questao4: 0,
    questao5: 0,
    questao6: 0,
    questao7: 0,
    questao8: 0,
    questao9: 0,
    questao10: 0,
    questao11: 0,
    questao12: 0,
    questao13: 0,
    questao14: 0,
    questao15: 0,
    questao16: 0,
    questao17: 0,
    questao18: 0,
    questao19: 0,
    questao20: 0,
    questao21: 0,
    questao22: 0,
    questao23: 0,
    questao24: 0,
    questao26: 0,
    questao27: 0,
    questao28: 0,
    questao29: 0,
    questao30: 0
  }

  constructor(private alertController: AlertController, private cdr: ChangeDetectorRef, private firebaseService: AuthService, private fb: FormBuilder, private navController: NavController) { 
    this.form = this.fb.group({
      pacienteName: ['', Validators.required],
      pacienteDoenca: ['', Validators.required],
      pacienteMedicamento: ['', Validators.required],
      questao1: ['', Validators.required],
      questao2: ['', Validators.required],
      questao3: ['', Validators.required],
      questao4: ['', Validators.required],
      questao5: ['', Validators.required],
      questao6: ['', Validators.required],
      questao7: ['', Validators.required],
      questao8: ['', Validators.required],
      questao9: ['', Validators.required],
      questao10: ['', Validators.required],
      questao11: ['', Validators.required],
      questao12: ['', Validators.required],
      questao13: ['', Validators.required],
      questao14: ['', Validators.required],
      questao15: ['', Validators.required],
      questao16: ['', Validators.required],
      questao17: ['', Validators.required],
      questao18: ['', Validators.required],
      questao19: ['', Validators.required],
      questao20: ['', Validators.required],
      questao21: ['', Validators.required],
      questao22: ['', Validators.required],
      questao23: ['', Validators.required],
      questao24: ['', Validators.required],
      questao25: ['', Validators.required],
      questao26: ['', Validators.required],
      questao27: ['', Validators.required],
      questao28: ['', Validators.required],
      questao29: ['', Validators.required],
      questao30: ['', Validators.required],
      questao7idade: ['', Validators.required],
      questao8idade: ['', Validators.required]
      // Add controls for other questions as needed
    });
  }


  ngOnInit() {
  }

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name?: string;
  questoes: Map<string, string> = new Map();
  textosExtras: Map<string, {text: string, color: string}> = new Map();

  cancel() {
    const modal = document.querySelector('ion-modal');
    if (modal) {
    modal.dismiss(null, 'cancel');
    } else {
      console.error('Modal not found');
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  formataNumero(e: any){
    let input:string = e.target.value;
    // Remover tudo exceto dígitos
    let apenasNumeros:string = input.replace(/[^\d]/g, '');
    // Limitar o número de dígitos para 2
    let numeroFormatado:string = apenasNumeros.slice(0, 2);
    // Atualizar o valor do input
    e.target.value = numeroFormatado;
  }

  formataNumeroIdade(e: any){
    let input:string = e.target.value;
    // Remover tudo exceto dígitos
    let apenasNumeros:string = input.replace(/[^\d]/g, '');
    // Limitar o número de dígitos para 2
    let numeroFormatado:string = apenasNumeros.slice(0, 3);
    // Atualizar o valor do input
    e.target.value = numeroFormatado;
  }

  handleIonChange(questao: string, opcaoSelecionada: string) {
    console.log(`IonChange - Questão: ${questao}, Opção Selecionada: ${opcaoSelecionada}`);
    this.atualizarPontuacao(questao, opcaoSelecionada);
    this.atualizarQuestao(questao, opcaoSelecionada);
}

  atualizarPontuacao(questao: string, opcaoSelecionada: string) {
    this.pontuacaoTotal[questao] = 0;
    console.log(`Atualizando pontuação para: ${questao}, opção selecionada: ${opcaoSelecionada}`);
    //questao1
    if (opcaoSelecionada === 'empregoSim' || opcaoSelecionada === 'empregoRecebe') {
      this.pontuacaoTotal[questao] += 1;
    } else if (opcaoSelecionada === 'empregoNao') {
      this.pontuacaoTotal[questao] -= 1;
    }//questao2
    if (opcaoSelecionada === 'depresSim') {
      this.pontuacaoTotal[questao] -= 1;
    }//questao3
    if (opcaoSelecionada === 'motivoMedicSim') {
      this.pontuacaoTotal[questao] += 2;
    } else if (opcaoSelecionada === 'motivoMedicNao') {
      this.pontuacaoTotal[questao] -= 2;
    }//questao4
    if (opcaoSelecionada === 'incentivoNaoFam' || opcaoSelecionada === 'incentivoFamNao') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'incentivoFamSim') {
      this.pontuacaoTotal[questao] += 2;
    }//questao5
    if (opcaoSelecionada === 'assocNao') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'assocSim') {
      this.pontuacaoTotal[questao] += 2;
    }//questao6
    if (opcaoSelecionada === 'tristSim') {
      this.pontuacaoTotal[questao] -= 1;
    }//questao7
    if (opcaoSelecionada === 'LerNao' && this.questao7idade <= '3' && this.questao8idade >= '15') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'LerSim' && this.questao7idade >= '4' && this.questao8idade >= '15') {
      this.pontuacaoTotal[questao] += 1;
    }//questao8
    if (opcaoSelecionada === 'idadeL60') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'idadeO60') {
      this.pontuacaoTotal[questao] += 1;
    }//questao9
    if (opcaoSelecionada === 'compSaudeSim') {
      this.pontuacaoTotal[questao] += 1;
    }//questao10
    if (opcaoSelecionada === 'cuidadorSim') {
      this.pontuacaoTotal[questao] -= 1;
    }//questao11
    if (opcaoSelecionada === 'esquecerDoseMuito' || opcaoSelecionada === 'esquecerDosePouco') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'esquecerDoseNunca' || opcaoSelecionada === 'esquecerDoseRaro') {
      this.pontuacaoTotal[questao] += 1;
    }//questao12
    if (opcaoSelecionada === 'conhecNao') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'conhecSim') {
      this.pontuacaoTotal[questao] += 2;
    }//questao13
    if (opcaoSelecionada === 'cuidarNao') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'cuidarSim') {
      this.pontuacaoTotal[questao] += 2;
    }//questao14
    if (opcaoSelecionada === 'aceitacNao' || opcaoSelecionada === 'aceitacLeigo') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'aceitacSim') {
      this.pontuacaoTotal[questao] += 2;
    }//questao15
    if (opcaoSelecionada === 'rotinaSim') {
      this.pontuacaoTotal[questao] += 1;
    }//questao16
    if (opcaoSelecionada === 'melhoraPara') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'melhoraToma') {
      this.pontuacaoTotal[questao] += 2;
    }//questao17
    if (opcaoSelecionada === 'receberSimComprarNao') {
      this.pontuacaoTotal[questao] += 2;
    }//questao18
    if (opcaoSelecionada === 'custoAltoSim') {
      this.pontuacaoTotal[questao] -= 2;
    } else if (opcaoSelecionada === 'custoAltoNao') {
      this.pontuacaoTotal[questao] += 2;
    }//questao19
    if (opcaoSelecionada === 'quantAlta') {
      this.pontuacaoTotal[questao] -= 2;
    } else if (opcaoSelecionada === 'quantBoa') {
      this.pontuacaoTotal[questao] += 1;
    } else if (opcaoSelecionada === 'quantBaixa') {
      this.pontuacaoTotal[questao] -= 1;
    }//questao20
    if (opcaoSelecionada === 'dificSim') {
      this.pontuacaoTotal[questao] -= 1;
    }//questao21
    if (opcaoSelecionada === 'colatSim') {
      this.pontuacaoTotal[questao] -= 2;
    } else if (opcaoSelecionada === 'colatNao') {
      this.pontuacaoTotal[questao] += 2;
    }//questao22
    if (opcaoSelecionada === 'importNao') {
      this.pontuacaoTotal[questao] -= 2;
    } else if (opcaoSelecionada === 'importSim') {
      this.pontuacaoTotal[questao] += 2;
    }//questao23
    if (opcaoSelecionada === 'abandSim') {
      this.pontuacaoTotal[questao] -= 2;
    }//questao24
    if (opcaoSelecionada === 'atrapSim') {
      this.pontuacaoTotal[questao] -= 1;
    } else if (opcaoSelecionada === 'atrapNao') {
      this.pontuacaoTotal[questao] += 1;
    }//questao25
     if (opcaoSelecionada === 'acordoSim') {
      this.pontuacaoTotal[questao] += 2;
    } else if (opcaoSelecionada === 'acordoNao') {
      this.pontuacaoTotal[questao] -= 1;
    }//questao26
    if (opcaoSelecionada === 'satisfSim') {
      this.pontuacaoTotal[questao] += 2;
    }//questao27
    if (opcaoSelecionada === 'infoSim') {
      this.pontuacaoTotal[questao] += 2;
    } else if (opcaoSelecionada === 'infoNao') {
      this.pontuacaoTotal[questao] -= 2;
    }//questao28
    if (opcaoSelecionada === 'confiaSim') {
      this.pontuacaoTotal[questao] += 2;
    } else if (opcaoSelecionada === 'confiaNao') {
      this.pontuacaoTotal[questao] -= 1;
    }//questao29
    if (opcaoSelecionada === 'motivSim') {
      this.pontuacaoTotal[questao] += 1;
    }//questao30
    if (opcaoSelecionada === 'acostSim') {
      this.pontuacaoTotal[questao] += 1;
    }


    console.log(`Pontuação atualizada para ${questao}: ${this.pontuacaoTotal[questao]}`);

  }

  calcularPontuacaoTotal(): number {
    let totalPontuacao = 0;
    for (const questao in this.pontuacaoTotal) {
      totalPontuacao += this.pontuacaoTotal[questao];
    }
    console.log(`Pontuação total: ${totalPontuacao}`);
    return totalPontuacao;
  }

  atualizarQuestao(questao: string, opcaoSelecionada: string) {
    this.questoes.set(questao, opcaoSelecionada);
    if (questao === 'questao1') {
      if (opcaoSelecionada === 'empregoSim' || opcaoSelecionada === 'empregoRecebe' ) {
        this.textosExtras.set(questao, { text: 'Pessoa com fonte de renda', color: 'green' });
      } else if (opcaoSelecionada === 'empregoNao') {
        this.textosExtras.set(questao, { text: 'Pessoa sem fonte de renda', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao2') {
      if (opcaoSelecionada === 'depresSim') {
        this.textosExtras.set(questao, { text: 'Pessoa com depressão', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao3') {
      if (opcaoSelecionada === 'motivoMedicSim') {
        this.textosExtras.set(questao, { text: 'Conhecimento sobre a farmacoterapia', color: 'green' });
      } else if (opcaoSelecionada === 'motivoMedicNao') {
        this.textosExtras.set(questao, { text: 'Falta de conhecimento sobre a condição de saúde', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao4') {
      if (opcaoSelecionada === 'incentivoNaoFam' || opcaoSelecionada === 'incentivoFamNao' ) {
        this.textosExtras.set(questao, { text: 'Falta de apoio social', color: 'red' });
      } else if (opcaoSelecionada === 'incentivoFamSim') {
        this.textosExtras.set(questao, { text: 'Paciente tem apoio social', color: 'green' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao5') {
      if (opcaoSelecionada === 'empregoSim') {
        this.textosExtras.set(questao, { text: 'Pessoa com apoio de indivíduos com doenças semelhantes', color: 'green' });
      } else if (opcaoSelecionada === 'assocNao') {
        this.textosExtras.set(questao, { text: 'Falta de apoio de pessoas com doenças semelhantes', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao6') {
      if (opcaoSelecionada === 'tristSim') {
        this.textosExtras.set(questao, { text: 'Falta de ânimo', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao7') {
      if (opcaoSelecionada === 'LerSim') {
        this.textosExtras.set(questao, { text: 'Alfabetizado', color: 'green' });
      } else if (opcaoSelecionada === 'LerNao') {
        this.textosExtras.set(questao, { text: 'Analfabeto', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao8') {
      if (opcaoSelecionada === 'idadeO60' ) {
        this.textosExtras.set(questao, { text: 'Idoso', color: 'green' });
      } else if (opcaoSelecionada === 'idadeL60') {
        this.textosExtras.set(questao, { text: 'Adulto', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao9') {
      if (opcaoSelecionada === 'compSaudeSim' ) {
        this.textosExtras.set(questao, { text: 'Percepção das complicações causadas pela condição e saúde', color: 'green' });
      }  else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao10') {
      if (opcaoSelecionada === 'cuidadorSim') {
        this.textosExtras.set(questao, { text: 'Ser cuidador', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao11') {
      if (opcaoSelecionada === 'esquecerDoseRaro' || opcaoSelecionada === 'esquecerDoseNunca' ) {
        this.textosExtras.set(questao, { text: 'Não omissão de dose por esquecimento', color: 'green' });
      } else if (opcaoSelecionada === 'esquecerDoseMuito' || opcaoSelecionada === 'esquecerDosePouco') {
        this.textosExtras.set(questao, { text: 'Omissão de dose por esquecimento', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao12') {
      if (opcaoSelecionada === 'conhecSim') {
        this.textosExtras.set(questao, { text: 'Percepção sobre a severidade da doença', color: 'green' });
      } else if (opcaoSelecionada === 'conhecNao') {
        this.textosExtras.set(questao, { text: 'Não percepção sobre a severidade da doença', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao13') {
      if (opcaoSelecionada === 'cuidarSim' ) {
        this.textosExtras.set(questao, { text: 'Motivação para o tratamento da doença', color: 'green' });
      } else if (opcaoSelecionada === 'cuidarNao') {
        this.textosExtras.set(questao, { text: 'Falta de motivação para o tratamento da doença', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao14') {
      if (opcaoSelecionada === 'aceitacNao' || opcaoSelecionada === 'aceitacLeigo' ) {
        this.textosExtras.set(questao, { text: 'Não aceitação da condição de saúde', color: 'red' });
      } else if (opcaoSelecionada === 'aceitacSim') {
        this.textosExtras.set(questao, { text: 'Aceitação da condição de saúde', color: 'green' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao15') {
      if (opcaoSelecionada === 'rotinaSim' ) {
        this.textosExtras.set(questao, { text: 'Utilização do medicamento quando a pessoa sai da rotina', color: 'green' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao16') {
      if (opcaoSelecionada === 'melhoraToma' ) {
        this.textosExtras.set(questao, { text: 'Não parar de utilizar o medicamento quando se sente melhor', color: 'green' });
      } else if (opcaoSelecionada === 'melhoraPara') {
        this.textosExtras.set(questao, { text: 'Parar de utilizar o medicamento quando se sente melhor', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao17') {
      if (opcaoSelecionada === 'receberSimComprarNao') {
        this.textosExtras.set(questao, { text: 'Acesso grátis ao medicamento', color: 'green' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao18') {
      if (opcaoSelecionada === 'custoAltoNao' ) {
        this.textosExtras.set(questao, { text: 'Custo baixo do medicamento', color: 'green' });
      } else if (opcaoSelecionada === 'custoAltoSim') {
        this.textosExtras.set(questao, { text: 'Custo alto do medicamento', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao19') {
      if (opcaoSelecionada === 'quantBaixa' || opcaoSelecionada === 'quantAlta' ) {
        this.textosExtras.set(questao, { text: 'Percepção de que não utiliza a quantidade correta de medicamentos', color: 'red' });
      } else if (opcaoSelecionada === 'quantBoa') {
        this.textosExtras.set(questao, { text: 'Percepção de que utiliza a quantidade correta de medicamentos', color: 'green' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao20') {
      if (opcaoSelecionada === 'dificSim' ) {
        this.textosExtras.set(questao, { text: 'Desconforto ao utilizar o medicamento', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao21') {
      if (opcaoSelecionada === 'colatNao' ) {
        this.textosExtras.set(questao, { text: 'Percepção de benefícios do medicamento', color: 'green' });
      } else if (opcaoSelecionada === 'colatSim') {
        this.textosExtras.set(questao, { text: 'Percepção de malefícios do medicamento', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao22') {
      if (opcaoSelecionada === 'importSim') {
        this.textosExtras.set(questao, { text: 'Considerar a utilização do medicamento importante para o tratamento', color: 'green' });
      } else if (opcaoSelecionada === 'importNao') {
        this.textosExtras.set(questao, { text: 'Não considerar a utilização do medicamento importante para o tratamento', color: 'red' });
      }else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao23') {
      if (opcaoSelecionada === 'abandNao') {
        this.textosExtras.set(questao, { text: 'Possível evento adverso relacionado ao medicamento', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao24') {
      if (opcaoSelecionada === 'atrapNao' ) {
        this.textosExtras.set(questao, { text: 'A utilização do medicamento não atrapalha a realização das atividades diárias', color: 'green' });
      } else if (opcaoSelecionada === 'atrapSim') {
        this.textosExtras.set(questao, { text: 'A utilização do medicamento atrapalha as atividades diárias', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao25') {
      if (opcaoSelecionada === 'acordoSim' ) {
        this.textosExtras.set(questao, { text: 'Concorda com a prescrição', color: 'green' });
      } else if (opcaoSelecionada === 'acordoNao') {
        this.textosExtras.set(questao, { text: 'Não concordar com a prescrição', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao26') {
      if (opcaoSelecionada === 'satisfSim' ) {
        this.textosExtras.set(questao, { text: 'Satisfação com o atendimento', color: 'green' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao27') {
      if (opcaoSelecionada === 'infoSim' ) {
        this.textosExtras.set(questao, { text: 'Considera que recebeu informações suficientes para a utilização do medicamento', color: 'green' });
      } else if (opcaoSelecionada === 'infoNao') {
        this.textosExtras.set(questao, { text: 'Não considera que recebeu informações suficientes para a utilização do medicamento', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao28') {
      if (opcaoSelecionada === 'confiaSim' ) {
        this.textosExtras.set(questao, { text: 'Confiança no prescritor', color: 'green' });
      } else if (opcaoSelecionada === 'confiaNao') {
        this.textosExtras.set(questao, { text: 'Não confiança no prescritor', color: 'red' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao29') {
      if (opcaoSelecionada === 'motivSim' ) {
        this.textosExtras.set(questao, { text: 'Estímulo positivo para a utilização do medicamento', color: 'green' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    if (questao === 'questao30') {
      if (opcaoSelecionada === 'acostSim' ) {
        this.textosExtras.set(questao, { text: 'Hábito de utilizar o medicamento', color: 'green' });
      } else {
        this.textosExtras.delete(questao);
      }
    }
    this.cdr.detectChanges();
  } 

  async limparSelecoes() {
    const alert = await this.alertController.create({
      header: 'Limpar seleções',
      message: 'Tem certeza de que deseja limpar todas as seleções?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.questao1 = '';
            this.questao2 = '';
            this.questao3 = '';
            this.questao4 = '';
            this.questao5 = '';
            this.questao6 = '';
            this.questao7 = '';
            this.questao8 = '';
            this.questao9 = '';
            this.questao10 = '';
            this.questao11 = '';
            this.questao12 = '';
            this.questao13 = '';
            this.questao14 = '';
            this.questao15 = '';
            this.questao16 = '';
            this.questao17 = '';
            this.questao18 = '';
            this.questao19 = '';
            this.questao20 = '';
            this.questao21 = '';
            this.questao22 = '';
            this.questao23 = '';
            this.questao24 = '';
            this.questao25 = '';
            this.questao26 = '';
            this.questao27 = '';
            this.questao28 = '';
            this.questao29 = '';
            this.questao30 = '';
            this.pontuacaoTotal = {};
            this.questao7idade = '';
            this.questao8idade = '';
            this.questoes.clear();
            this.textosExtras.clear();
          },
        },
      ],
    });
    await alert.present();
  }

  async submitFormUser(event: Event) {
    event.preventDefault();
    const responses = this.form.value;
    try {
      await this.firebaseService.saveAllResponses(responses);
      await this.showAlert('Sucesso', 'Respostas salvas com sucesso!');
      location.reload();
    } catch (error) {
      console.error('Erro salvando: ', error);
      await this.showAlert('Erro', 'Erro ao salvar.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
