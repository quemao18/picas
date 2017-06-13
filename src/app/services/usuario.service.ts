import { Injectable } from '@angular/core';
import * as vars from '../variables';
import { Http, Headers, URLSearchParams, RequestOptions, Jsonp } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FooterComponent } from '../footer/footer.component';

@Injectable()
export class UsuarioService {

  public error = '';
  constructor(private http: Http, private _flashMessagesService:FlashMessagesService) { }

  registrar(usuario, pago){
      //console.log(pago);
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(vars.apiUrl+ "/usuarios/nuevo/", "usuario="+JSON.stringify(usuario)+"&pago="+JSON.stringify(pago)+"&"+vars.nameKeyApi+"="+vars.keyApi, options)
      .map(res => res.json())
  }

  rif(cedula){
     return this.http.get(vars.apiUrl + '/usuarios/nombre_rif/rif/'+cedula + '/' + vars.nameKeyApi + '/' + vars.keyApi);
  }
  buscar(cedula){
     return this.http.get(vars.apiUrl + '/usuarios/usuario_id/id/'+cedula + '/' + vars.nameKeyApi + '/' + vars.keyApi);
  }


 buscarNombre(cedula){
     this.http.get(vars.apiUrl + '/usuarios/usuario_id/id/'+cedula + '/' + vars.nameKeyApi + '/' + vars.keyApi)
      .subscribe(
            (response) => this.onSuccessNombre(response.json()), 
            (error) => this.onError(error.json()), 
            () => this.onComplete()
          );
  }

  onSuccessNombre(response){
    response.nombre;
}


  login(user: any):any{

    let params: URLSearchParams = new URLSearchParams();
    params.set('id', user.cedula);
    params.set(vars.nameKeyApi, vars.keyApi);
    
    //params.set('password', user.password);

          //Http request-
          return this.http.get(vars.apiUrl + '/usuarios/usuario_id/id/'+user.cedula + '/' + vars.nameKeyApi + '/' + vars.keyApi)
         
      }

  onSuccess(response){


  //this.isLogged = true;
}
onError(error){
  //console.log(error.message);
  this._flashMessagesService.show(error.message, { cssClass: 'alert-danger' } );
}
onComplete(){
  localStorage.setItem('logged', 'true');
  //this.logged = true;
}

logout() {
    //localStorage.removeItem('id_usuario');
    localStorage.clear();
    //this.loggedIn.emit(false);
    //location.href = 'home';
   //this.router.navigateByUrl('/home');
   
  }

isLogged() {
    if(localStorage.getItem('logged') === 'true')
    //this.isAdmin.emit(true);
    return true;
    else
    return false;
    //return this.logged;
  }

 getError() {
    return this.error;
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
