import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteModel } from '../../../gdev-store/public/clientes/cliente.model';
import { ClientesService } from '../../../gdev-store/public/clientes/clientes.service';

@Component({
  selector: 'gdev-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  @Input() cliente: ClienteModel
  @Output() close = new EventEmitter<boolean>();

  constructor (
    public clienteS: ClientesService
  ) { }

  ngOnInit(): void {
  }

}
