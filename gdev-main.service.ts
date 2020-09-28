import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatosContactoModel } from './contacto/contacto.model';
import { AlertService } from '../Gdev-Tools/alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class GdevMainService {

  constructor (
    private fs: AngularFirestore,
    private _alert: AlertService
  ) { }
  
  addSiteInfo() {
    
  }

  async addContactDatos( datos: DatosContactoModel ) {
    
    await this.fs.collection( '_admin' ).ref.doc( 'datos_contacto' )
      .set( { ...datos }, { merge: true } )
    
    this._alert.sendFloatNotification('Datos guardados')
  }

  async getContactDatos() {
    var doc = await this.fs.collection( '_main' ).ref.doc( 'datos_contacto' ).get()
    return doc.data() as DatosContactoModel
  }
}
