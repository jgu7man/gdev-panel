import { Component, OnInit } from '@angular/core';
import { GdevResponsiveService } from '../../Gdev-Tools/commons/gdev-responsive.service';
import { SidenavNode } from '../../Gdev-Tools/sidenav/sidenav.interface';

@Component({
  selector: 'gdev-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor (
    public responsive: GdevResponsiveService
  ) { }

  ngOnInit() {
  }

  sidenavStructure: SidenavNode[] = [
    {
      name: 'Inicio',
      routeId: [ 'identidad' ],
      route: 'inicio',
      childs: [
        {
          name: 'Identidad del sitio',
          route: 'inicio/identidad',
        },
      ]
    },
    // {
    //   name: 'Diseño',
    //   routeId: [ 'hero' ],
    //   childs: [
        
    //   ]
    // },
    {
      name: 'Tienda',
      routeId: ['config', 'categories', 'productos', 'pedidos', 'slider'],
      childs: [
        {
          name: 'Configuración',
          route: '/panel/tienda/config',
          routeId: 'config'
        },
        {
          name: 'Categorías',
          route: '/panel/tienda/categories',
        },
        {
          name: 'Productos',
          route: '/panel/tienda/products',
        },
        {
          name: 'Pedidos',
          route: '/panel/tienda/pedidos'
        },
        {
          name: 'Slider',
          route: '/panel/tienda/slider'
        },
      ]
    },
    {
      name: 'Clientes',
      routeId: 'clientes',
      route: 'clientes',
      childs: [
      ]
    },
    {
      name: 'Mails',
      route: 'mails',
      routeId: 'mails'
    },
    {
      name: 'Admin',
      routeId: 'admins',
      route: 'admins'
    },
  ]
}
