import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { HomeComponent } from './home/home.component';

import { SolicitudComponent } from './solicitud/solicitud.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UploadService } from './services/upload.service';
import { EstadosComponent } from './estados/estados.component';




@NgModule({
  declarations: [
    AppComponent,
    SolicitudesComponent,
    HomeComponent,
    SolicitudComponent,
    EstadosComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()



  ],
  providers: [
    AuthGuard,
    AuthService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
