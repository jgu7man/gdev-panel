import { Component, OnInit } from '@angular/core';
import { DatosContactoModel } from './contacto.model';
import { GdevMainService } from '../gdev-main.service';
import { Ubication, GeoCords } from 'src/app/Gdev-Tools/maps/maps.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'gdev-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  datosContacto: DatosContactoModel
  cords: GeoCords = { lat: 0, lng: 0 }
  ubication: Ubication = {
    address: '',
    dist: '',
    city: '',
    state: '',
    country: ''
  }

  constructor (
    public storeS: GdevMainService,
    private fs: AngularFirestore
  ) {
    this.datosContacto = new DatosContactoModel('','','','','','','', '',this.ubication, this.cords)
   }

  async ngOnInit() {
    this.getDatos()
  }

  onUbicationChanges(ubication: Ubication) {
    this.datosContacto.ubication = ubication
  }
  
  async getDatos() {
    this.datosContacto = await this.storeS.getContactDatos()
    if ( this.datosContacto.maps ) { this.cords = this.datosContacto.maps }
  }

}
