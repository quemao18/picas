import { Component } from '@angular/core';
import {Routes} from '@angular/router';
import * as vars from './variables';

import { PagosComponent } from './pagos/pagos.component';
import { PicasComponent } from './picas/picas.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = vars.app;

 
}

export const APP_ROUTES: Routes = [
  {path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'pagos', component: PagosComponent},
  {path: 'picas', component: PicasComponent},
  
];


export function validarRIF( campo )
{
	//var divResultado = document.getElementById('errorDiv3');
	 if(campo === undefined || campo===""){
         return false;
     }
	
	else
	{
	var cedula = campo;
	var array = cedula.split( "" );
	var resto=cedula.substr(1);
			if(
				array[0]!=="V" &&		 
				array[0]!=="J" &&
				array[0]!=="E" &&
				array[0]!=="P" &&
				array[0]!=="G"  
				)
			{
		  	 return false;
			}else{
				if(	!isNaN(resto) && resto.length>5 && resto.length<10)
				{
					return true;
				}else{
					return false;
				}
			}
	}
}