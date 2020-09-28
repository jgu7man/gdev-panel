import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { AdminComponent } from './admin/admin.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: '', component: PanelComponent, children: [
    { path: '', component: ContactoComponent },
    { path: 'admins', component: AdminComponent },
    { path: 'contacto', component: ContactoComponent },
    {
      path: 'tienda', 
      loadChildren: () => import('../gdev-store/panel/gdev-store-panel.module').then(m => m.GdevStorePanelModule)
    },
  ] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GdevPanelRoutingModule { }
