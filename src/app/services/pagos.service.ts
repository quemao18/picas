import { Injectable } from '@angular/core';
import * as vars from '../variables';
import { Http, Headers, URLSearchParams, RequestOptions, Jsonp } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FooterComponent } from '../footer/footer.component';

@Injectable()
export class PagosService {

  public error = '';
  constructor(private http: Http, private _flashMessagesService:FlashMessagesService) { }

  bancos(){
     return this.http.get(vars.apiUrl + '/usuarios/usuarios_bancos/format/json/' + vars.nameKeyApi + '/' + vars.keyApi)
  }

  pagos(){
     return this.http.get(vars.apiUrl + '/pagos/pagos/' + vars.nameKeyApi + '/' + vars.keyApi)
  }

  cambiarEstado(estado){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(vars.apiUrl+ "/pagos/actualizar/", "estado="+JSON.stringify(estado)+"&"+vars.nameKeyApi+"="+vars.keyApi, options)
      .map(res => res.json())
  }


  onSuccess(response){

  
  //console.log(localStorage);
  //this.isLogged = true;
}
onError(error){
  //console.log(error.message);
  this._flashMessagesService.show(error.message, { cssClass: 'alert-danger' } );
}
onComplete(){
  
}


isLogged() {
    if(localStorage.getItem('logged') === 'true')
    //this.isAdmin.emit(true);
    return true;
    else
    return false;
    //return this.logged;
  }


  isAdmin() {
    if(localStorage.getItem('tipo') === 'Administrador')
    //this.isAdmin.emit(true);
    return true;
    else
    return false;
    //this.isAdmin.emit(false);
  }

  getUserName(){
    return localStorage.getItem('nombre');
  }

  getUserId(){
    return localStorage.getItem('id_usuario');
  }

  getRole(){
    return localStorage.getItem('tipo');
  }



}
