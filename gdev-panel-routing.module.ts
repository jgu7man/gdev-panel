import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { AdminComponent } from './admin/admin.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MailsComponent } from './mails/mails.component';
import { SingupAdminComponent } from './admin/singup-admin/singup-admin.component';



const routes: Routes = [
  { path: '', component: PanelComponent, children: [
    { path: '', component: ContactoComponent },
    { path: 'admins', component: AdminComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'mails', component: MailsComponent },
    {
      path: 'tienda', 
      loadChildren: () => import('../gdev-store/panel/gdev-store-panel.module').then(m => m.GdevStorePanelModule)
    },
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: SingupAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GdevPanelRoutingModule { }
