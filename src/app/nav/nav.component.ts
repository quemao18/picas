import { Component, OnInit, ViewChild } from '@angular/core';
import * as vars from '../variables';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';
import { validarRIF } from '../app.component';
import { UsuarioService } from '../services/usuario.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  title = vars.app;
  usuario = { cedula: '', nombre:''};
  @ViewChild('validationModal')
  modal: ModalComponent;
  items: string[] = ['item1', 'item2', 'item3'];
  selected: string;
  output: string;
  error = '';
  progress = false;
  ///model: Person = new Person();

  index: number = 0;
  backdropOptions = [true, false, 'static'];
  cssClass: string = '';

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService, private _flashMessagesService:FlashMessagesService) { }


  closed() {

        this.progress = true;
        this.usuarioService.login(this.usuario)
         .subscribe(
            (response) => this.onSuccess(response.json()), 
            (error) => this.onError(error.json()), 
            () => this.onComplete()
          );
        //this._flashMessagesService.show('Success!', { cssClass: 'alert-success' } 

    }

  onSuccess(response){
  this.progress = false;
  localStorage.setItem('id_usuario', response.id_usuario);
  localStorage.setItem('nombre', response.nombre);
  localStorage.setItem('tipo', response.tipo);
  this.error = '';
  //console.log(localStorage);
  //this.isLogged = true;
}
onError(error){
    this.progress = false;
  //console.log(error.message);
  this._flashMessagesService.show(error.message, { cssClass: 'alert-danger' } );
}
onComplete(){
    this.progress = false;
  localStorage.setItem('logged', 'true');
  //this.logged = true;
}

  isLogged(){
    return this.usuarioService.isLogged();
  }
  logout(){
      this.usuarioService.logout();
  }
  dismissed() {
      this.output = '(dismissed)';
  }

  opened() {
      this.output = '(opened)';
  }

  navigate() {
      this.router.navigateByUrl('/home');
  }

  open() {
      this.modal.open();
  }
  
  ngOnInit() {
  }

}
