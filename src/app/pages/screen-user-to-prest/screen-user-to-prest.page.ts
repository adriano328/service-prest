import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { IPrestador } from 'src/app/shared/interface/IPrestador';
import { IRegistroAvaliacao } from 'src/app/shared/interface/IRegistroAvaliacao';
import { IRegistroServico } from 'src/app/shared/interface/IRegistroServico';
import { IServico } from 'src/app/shared/interface/IServico';
import { IServicoRegistre } from 'src/app/shared/interface/IServicoRegistre';
import { IUsuario } from 'src/app/shared/interface/IUsuario';
import { UserServiceService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-screen-user-to-prest',
  templateUrl: './screen-user-to-prest.page.html',
  styleUrls: ['./screen-user-to-prest.page.scss'],
})
export class ScreenUserToPrestPage implements OnInit {

  registroSave: IServicoRegistre = {} as IServicoRegistre
  usuarioStorage: IUsuario = {} as IUsuario 
  schedule: FormGroup
  canShow: boolean = false;
  professionalId: number;
  professionalSave: IRegistroAvaliacao = {} as IRegistroAvaliacao;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: ActivatedRoute
  ) {
    this.professionalId = parseInt(this.router.snapshot.paramMap.get('id')!);

    this.schedule = this.formBuilder.group({
      data:[''],
      descricao:['']
    })
  }

  async ngOnInit() {
    this.professionalSave = await this.userService.getById(this.professionalId);
    this.professionalSave.prestador.nome = this.professionalSave.prestador.nome.split(" ", 2)[0] + " " + this.professionalSave.prestador.nome.split(" ", 2)[1];
    this.usuarioStorage = JSON.parse(localStorage.getItem('usuario'))       
  }

  solicityService(){
    this.canShow = true
  }

  async saveData(){
    this.registroSave.horarioDeAtentimento = this.convertDate(this.schedule.value.data),
    this.registroSave.descricaoServico = this.schedule.value.descricao,
    this.registroSave.prestador = this.professionalSave.prestador
    this.registroSave.cliente = this.usuarioStorage.id.toString()

    this.userService.saveService(this.registroSave);        
  }

  convertDate(data: string){
    return data.substring(0, data.length -6)
  }

}
