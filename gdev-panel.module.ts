import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { GdevToolsModule } from '../gdev-tools/gdev-tools.module';
import { GdevComponentsModule } from '../gdev-components/gdev-components.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { GdevPanelRoutingModule } from './gdev-panel-routing.module';
import { PanelComponent } from './panel/panel.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { MailsComponent } from './mails/mails.component';
import { SingupAdminComponent } from './admin/singup-admin/singup-admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { IdentidadComponent } from './inicio/identidad/identidad.component';
import { BienvenidaComponent } from './inicio/bienvenida/bienvenida.component';
import { CalladminBoxComponent } from './admin/calladmin-box/calladmin-box.component';
import { InitComponent } from './init/init.component';


@NgModule({
  declarations: [
    PanelComponent,
    LoginComponent,
    AdminComponent,
    TopbarComponent,
    AddAdminComponent,
    EditAdminComponent,
    ContactoComponent,
    ClientesComponent,
    ClienteComponent,
    MailsComponent,
    SingupAdminComponent,
    InicioComponent,
    IdentidadComponent,
    BienvenidaComponent,
    CalladminBoxComponent,
    InitComponent
  ],
  imports: [
    CommonModule,
    GdevPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GdevToolsModule,
    GdevComponentsModule,
    NgxMaterialTimepickerModule
  ],
  entryComponents: [CalladminBoxComponent]
})
export class GdevPanelModule { }
