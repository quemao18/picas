import { Injectable } from '@angular/core';
import * as vars from '../variables';
import { Http, Headers, URLSearchParams, RequestOptions, Jsonp } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FooterComponent } from '../footer/footer.component';

@Injectable()
export class PicasService {

  public error = '';
  constructor(private http: Http, private _flashMessagesService:FlashMessagesService) { }

  picas(){
     return this.http.get(vars.apiUrl + '/picas/picas/' + vars.nameKeyApi + '/' + vars.keyApi)
  }

  crear(pica){
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(vars.apiUrl+ "/picas/nueva/", "pica="+JSON.stringify(pica)+"&"+vars.nameKeyApi+"="+vars.keyApi, options)
      .map(res => res.json())
  }

  guardar(pica){
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(vars.apiUrl+ "/picas/actualizar/", "pica="+JSON.stringify(pica)+"&"+vars.nameKeyApi+"="+vars.keyApi, options)
      .map(res => res.json())
  }

  dificultades(){
     return this.http.get(vars.apiUrl + '/picas/get_enum_values/tabla/picas/columna/dificultad/' + vars.nameKeyApi + '/' + vars.keyApi)
  }

  estados(){
     return this.http.get(vars.apiUrl + '/picas/get_enum_values/tabla/picas/columna/estado/' + vars.nameKeyApi + '/' + vars.keyApi)
  }




}
