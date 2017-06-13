import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { AppComponent, APP_ROUTES } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { PicasComponent } from './picas/picas.component';
import { PagosComponent, KeysPipe, FocusDirective } from './pagos/pagos.component';
import { HomeComponent } from './home/home.component';
import { UsuarioService } from './services/usuario.service';
import { PagosService } from './services/pagos.service';
import { PicasService } from './services/picas.service';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FlashMessagesModule } from 'angular2-flash-messages';
//import { NgProgressModule } from 'ng2-progressbar';
import { NgProgressModule } from 'ngx-progressbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponentModule } from 'ng2-component-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    PicasComponent,
    PagosComponent,
    HomeComponent,
    KeysPipe, 
    FocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
    FlashMessagesModule,
    NgProgressModule,
    NgxPaginationModule,
    SpinnerComponentModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [UsuarioService, NavComponent, PagosService, PicasService],
  entryComponents: [NavComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
