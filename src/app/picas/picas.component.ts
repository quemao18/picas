import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UsuarioService } from '../services/usuario.service';
import { PicasService } from '../services/picas.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-picas',
  templateUrl: './picas.component.html',
  styleUrls: ['./picas.component.css']
})
export class PicasComponent implements OnInit {

  title='Picas';
  progress = false;
  error = '';
  pica = { nombre:'', dificultad:'', estado:'' };
  picaEdit = { nombre:'', dificultad:'', estado:'' };
  picasVal = [];
  dificultadesVal = [];
  estadosVal = [];
  @ViewChild('validationModal')
  modal: ModalComponent;
  @ViewChild('editModal')
  modalEdit: ModalComponent;
  page: number = 1;

  constructor(private usuarioService: UsuarioService, private picasService: PicasService, private _flashMessagesService:FlashMessagesService) { }

  guardar(pica){
    console.log(pica);
    this.progress = true;
       (this.picasService.guardar(pica).subscribe(
            (response) => this.onSuccessSaveEdit(response), 
            (error) => this.onErrorSave(error), 
       ));


  }
  crear() {
       // this.output = '(closed) ' + this.selected;
       //console.log(this.pago);
      this.progress = true;
       (this.picasService.crear(this.pica).subscribe(
            (response) => this.onSuccessSave(response), 
            (error) => this.onErrorSave(error), 
       ));

    }
    onSuccessSaveEdit(response){
    this.progress = false;
    console.log(response);
    if(response.status == "failed")
        this.error = response.message;
        else{
        this.modal.close();
        this.modalEdit.close();
        this._flashMessagesService.show(response.message, { cssClass: 'alert-success' } );
        //window.location.reload();
    }
  }

  onSuccessSave(response){
    this.progress = false;
    console.log(response);
    if(response.status == "failed")
        this.error = response.message;
        else{
        this.modal.close();
        this.modalEdit.close();
        this._flashMessagesService.show(response.message, { cssClass: 'alert-success' } );
        //window.location.reload();
        this.picas();
    }
  }

    onErrorSave(error){
    this.progress = false;
    console.log(error.message);;
  }

  picas() {
       // this.output = '(closed) ' + this.selected;
       (this.picasService.picas().subscribe(
            (response) => {this.picasVal = (response.json()), this.progress = false}, 
            (error) => {console.log(error), this.progress = false}, 
       ));

    }
    

  dificultades() {
       // this.output = '(closed) ' + this.selected;
       this.progress = true;
       (this.picasService.dificultades().subscribe(
            (response) => {this.dificultadesVal = (response.json()), this.progress = false}, 
            (error) => {console.log(error), this.progress = false}
       ));

    }

  estados() {
       // this.output = '(closed) ' + this.selected;
       this.progress = true;
       (this.picasService.estados().subscribe(
            (response) => {this.estadosVal = (response.json()), this.progress = false},
            (error) => {console.log(error), this.progress = false}
       ));

    }

     open() {
        //this.nav.open();
        this.estados();
        this.dificultades();
        this.modal.open();
    }

    editarOpen(pica) {
        //this.nav.open();
        this.estados();
        this.dificultades();
        this.picaEdit = pica;
        this.modalEdit.open();
    }

    isAdmin(){
      return this.usuarioService.isAdmin();
    }

  ngOnInit() {
    this.progress = true;
    this.picas();
  }

}
