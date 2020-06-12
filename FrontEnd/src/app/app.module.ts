import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {productoService} from './service/producto.service';
/* importamos o concectamos el servicio al modulo principal */

/* Importar funciones o metodos http */
/* habilita los verbos http */
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './components/form/form.component';

import {FormsModule}  from '@angular/forms';
/* permite el uso de los componentes del formulario para tomar los datos */

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [productoService], /* proveer el servico a nuestra app Angular */
  bootstrap: [AppComponent]
})
export class AppModule { }
