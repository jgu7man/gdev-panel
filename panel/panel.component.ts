import { Component, Inject, OnInit } from '@angular/core';
import { GdevResponsiveService } from '../../gdev-tools/commons/gdev-responsive.service';
import { SidenavNode } from '../../gdev-tools/sidenav/sidenav.interface';
import { ColorService } from '../../gdev-tools/color/color.service';
import { AlertService } from '../../gdev-tools/alerts/alert.service';
import { GdevMainService } from '../gdev-main.service';
import { Router } from '@angular/router';


@Component({
  selector: 'gdev-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor (
    public responsive: GdevResponsiveService,
    private _color: ColorService,
    private _alert: AlertService,
    private _main: GdevMainService,
    private _router: Router
  ) {

    this._main.getContactDatos()
      .catch( () => {
        this._router.navigate( [ '/panel/inicio/identidad' ] )
        this._alert.sendMessageAlert('Es necesario llenar los datos identidad del sitio para comenzar')
      } )

    if ( this._alert.messageAlert$ ) {
      if ( this._color.ColorPalette ) {
        this._color.ColorPalette = {
          'bg1': '#F0F9FC',
          'bg2': '#A7BCC4',
          'bg3': '#F9E8E1',
          "primary": '#29B7FE',
          "acent": '#FC712B',
          'dark': '#001419',
          'complement1': '#0384C5',
        }
      }

      var favicon: HTMLLinkElement = document.querySelector( '[type="image/x-icon"]' )
      console.log( favicon )
      favicon.href = 'app/gdev-panel/assets/img/gdev-icono-trans-1x1.png'

    } else {
      console.error('Must add gdev-tools or gdev-alerts in the angular project')
    }
   }

  ngOnInit() { }

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
