import { Component, ElementRef, Inject, Directive, EventEmitter, ChangeDetectionStrategy, ViewChild, ViewEncapsulation, OnInit, Pipe, PipeTransform, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NavComponent } from '../nav/nav.component';
import { UsuarioService } from '../services/usuario.service';
import { PagosService } from '../services/pagos.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {NgProgressService} from 'ngx-progressbar';

@Pipe({name: 'keyValues'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    if (!value) {
      return value;
    } 

    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    } 
    return keys;
  } 
}

@Directive({
    selector: '[focus]'
})
export class FocusDirective {
    @Input()
    focus:boolean;
    constructor(@Inject(ElementRef) private element: ElementRef) {}
    protected ngOnChanges() {
        this.element.nativeElement.focus();
    }
}


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
  //encapsulation: ViewEncapsulation.None,

  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagosComponent implements OnInit {

  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
  title= 'Pagos';
  error = '';
  disabled = false;
  usuario = { id_usuario:'', nombre:'', telefono:'', email:'' };
  usuariosBanco = [{ id_usuario:'', nombre: '', banco:'' }];
  userNameBanco = '';
  pago = { monto:'', id_usuario_banco:'', referencia: '', fecha_deposito:''};
  @ViewChild('validationModal')
  modal: ModalComponent;
  items: string[] = ['item1', 'item2', 'item3'];
  selected: string;
  output: string;
  //pagosVal = [];
  pagosVal: string[] = [];
  page: number = 1;
  ///model: Person = new Person();

  index: number = 0;
  backdropOptions = [true, false, 'static'];
  cssClass: string = '';

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;
  progress = false;
  totalVal = 0;
  estado = {id_pago:'', estado:''};
  private inputFocused = false;

  constructor(private pService: NgProgressService, private router: Router, private nav:NavComponent, private usuarioService: UsuarioService, private pagosService:PagosService, private _flashMessagesService:FlashMessagesService) { }
 

 pagos() {
       this.progress = true;
       // this.output = '(closed) ' + this.selected;
       (this.pagosService.pagos().subscribe(
            (response) => {this.pagosVal = response.json(), this.total(response.json()), this.progress = false}, 
            (error) => {console.log(error), this.progress = false}, 
       ));

    }

  cambiarEstado(id_pago, estado){
    this.progress = true;
    this.estado.id_pago = id_pago;
    this.estado.estado = estado;
    //console.log(this.estado);
    this.pagosService.cambiarEstado(this.estado).subscribe(
            (response) => {this.pagos()}, 
            (error) => {console.log(error), this.progress = false}, 
    );
  }  
  
  total(response){
       var tempnumber=0;
       response.forEach((item) => {
                        if(item.estado=='Verificado')
                        tempnumber += parseFloat(item.monto);
                    })
      this.totalVal = tempnumber;
  }

  isAdmin(){
    return this.usuarioService.isAdmin();
  }

    bancos() {
      this.progress = true;
       // this.output = '(closed) ' + this.selected;
       (this.pagosService.bancos().subscribe(
            (response) => this.onSuccessBancos(response.json()), 
            (error) => this.onErrorBancos(error.json()), 
       ));

    }
    onSuccessBancos(response){
        //console.log(response);
        this.progress = false;
        this.usuariosBanco = response ;
  }

    onErrorBancos(error){
      this.progress = false;
    console.log(error.message);;
  }


  registrar() {
       // this.output = '(closed) ' + this.selected;
       //console.log(this.pago);
      this.error = '';
      this.progress = true;
       (this.usuarioService.registrar(this.usuario, this.pago).subscribe(
 (          response) => this.onSuccessSave(response), 
            (error) => this.onErrorSave(error), 
       ));

    }
    onSuccessSave(response){
    this.progress = false;
    console.log(response);
    if(response.status == "failed")
        this.error = response.message;
        else{
        this.modal.close();
        this._flashMessagesService.show(response.message, { cssClass: 'alert-success' } );
        this.pagos();
    }
  }

    onErrorSave(error){
    this.pService.done();
    console.log(error.message);;
  }

    dismissed() {
        this.output = '(dismissed)';
    }

    opened() {
        this.output = '(opened)';
    }

    navigate() {
        this.router.navigateByUrl('/hello');
    }

    open() {
        //this.nav.open();
        this.error = '';
        this.bancos();
        this.modal.open();
    }

    buscar($event){
      this.progress = true;
        this.error = 'Buscando...';
         this.usuarioService.buscar($event.target.value.toUpperCase()).subscribe(
            (response) => this.onSuccessLocal(response.json(), $event), 
            (error) => this.onErrorLocal(error.json(), $event), 
         )
    }


  onSuccessLocal(response, $event){
   
   this.progress = false;
    console.log(response);
    if(response){
        this.usuario.nombre = response.nombre;
        this.usuario.email = response.email;
        this.usuario.telefono = response.telefono;
        this.disabled = false;
        this.error = '';
    }else{
        //this.buscar_rif($event.target.value.toUpperCase());
    }
  }

  onErrorLocal(error, $event){
    this.progress = false;
    //console.log(error);
    this.buscar_rif($event);
    //this.usuario.nombre = '';
    //this.error = error.message;
  }


    buscar_rif($event){
      this.progress = true;
      this.inputFocused = false;
        //console.log($event.target.value);
         this.usuarioService.rif($event.target.value.toUpperCase()).subscribe(
            (response) => this.onSuccessRif(response.json(), $event), 
            (error) => this.onErrorRif(error.json()), 
         )

    }

  onSuccessRif(response, $event){
    //console.log(response)
    this.progress = false;
    this.usuario.nombre = response.nombre;
    this.disabled = false;
    this.error = '';
    if(this.usuario.nombre!='')
    this.moveFocus();
  }

  moveFocus() {
        this.inputFocused = true;
        // we need this because nothing will 
        // happens on next method call, 
        // ngOnChanges in directive is only called if value is changed,
        // so we have to reset this value in async way,
        // this is ugly but works
        setTimeout(() => {this.inputFocused = false});
    }

  onErrorRif(error){
    this.inputFocused = false;
    this.progress = false
    console.log(error);
    this.usuario.nombre = '';
    this.error = error.message;
  }

  ngOnInit() {
      this.pagos();
      this.bancos();
  }

}
