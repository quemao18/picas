import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import * as vars from '../variables'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  title  = vars.app;
  getUserName(){
    return this.usuarioService.getUserName() ;
  }

  getUserId(){
    return this.usuarioService.getUserId() ;
  }
  getRole(){
    return this.usuarioService.getRole() ;
  }
  ngOnInit() {
  
  }

}
