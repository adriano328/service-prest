import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilEnum, PerfilLabel } from 'src/app/shared/enum/perfilEnum';
import { IUsuario } from 'src/app/shared/interface/IUsuario';
import { AccountService } from 'src/app/shared/services/account.service';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IEndereco } from '../../shared/interface/IEndereco';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  usuarioSave: IUsuario = {} as IUsuario;
  enderecoSave: IEndereco = {} as IEndereco;

  selectOption: string

  photo: string = '';

  forms: FormGroup;

  perfil: any;

  canShow: boolean = false;

  ocupations: string [];

  photoShow = false;

  public PerfilLabel = PerfilLabel;
  public perfis = Object.values(PerfilEnum)

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public toastController: ToastController,
    private camera: Camera
  ) {



   }

  ngOnInit() {
    this.forms = this.formBuilder.group({
      nome:['', Validators.required],
      email:['', Validators.required],
      telefone:['', Validators.required],
      numero:['', Validators.required],
      endereco:['', Validators.required],
      senha:['', Validators.required],
      confirmSenha: ['', Validators.required],
      tipoConta:['Cliente'],
      tipoServico:[''],
      cep:['', Validators.required],
      bairro:['', Validators.required],
      cidade:['', Validators.required],
      estado:['', Validators.required]
    });

    this.ocupations = [
      'Pedreiro',
      'Pintor',
      'Eletricista',
      'Mecanico',
      'Soldador',
      'Encanador',
      'Pintura',
      'Montagem de móveis',
      'Diarista',
      'Mudança e frete',
      'Chaveiro',
      'Climatização',
      'Limpeza pós obra',
      'Remoção de entulho',
      'Automação residencial',
      'Segurança eletronica',
      'Serralheiro',
      'Vidraceiro',
      'Dedetizador',
      'Desentupidor',
      'Desinfecção',
      'Marceneiro',
      'Tapeceiro',
      'Jardineiro',
      'Paisagista',
      'Limpeza de piscina',
      'Redes de Proteção'
    ]
  }



  takePicture(){
    this.photo = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      targetHeight: 200,
      targetWidth:100,
      correctOrientation: true
    }
    this.camera.getPicture(options)
    .then((imageData) => {
      let base64image = 'data:image/jpeg;base64,' + imageData;
      this.photo = base64image;
    }, (error) => {
      console.error(error);
    })
    .catch((error) => {
      console.error(error);
    })

    this.photoShow = true;
  }

  async save(){
   
      this.enderecoSave.cep = this.forms.value.cep;
      this.enderecoSave.bairro = this.forms.value.bairro;
      this.enderecoSave.cidade = this.forms.value.cidade;
      this.enderecoSave.estado = this.forms.value.estado;
      this.enderecoSave.numero = this.forms.value.numero;

      this.usuarioSave.nome = this.forms.value.nome;
      this.usuarioSave.email = this.forms.value.email;
      this.usuarioSave.telefone = this.forms.value.telefone;
      this.usuarioSave.endereco = this.enderecoSave;
      this.usuarioSave.senha = this.forms.value.senha;
      this.usuarioSave.tipoDeConta = this.forms.value.tipoConta;
      this.usuarioSave.imagemPerfil = this.photo;
      this.usuarioSave.profissao = this.forms.value.tipoServico;



      this.accountService.save(this.usuarioSave).then(async success =>{
       const toast =  await this.toastController.create({message: 'Cadastro realizado com sucesso!', color:'success', translucent:true, position:'top'}); toast.present();
      }).catch(async error => {
        const toast =  await  this.toastController.create({message: (error.error.erro), color:'danger', translucent:true, position:'top'}); toast.present();
      });
      }

      selectPerfil() {
          if(this.forms.value.tipoConta === "PRESTADOR"){
            this.canShow = true
          }else{
            this.canShow = false
          }
      }
    }






