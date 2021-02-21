import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatosContactoModel } from './contacto/contacto.model';
import { AlertService } from '../gdev-tools/alerts/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { CalladminBoxComponent } from './admin/calladmin-box/calladmin-box.component';
import { MessageAlertModel } from '../gdev-tools/alerts/alerts.model';
import { Router } from '@angular/router';
import { StoreModel } from './models/store.model';

@Injectable({
  providedIn: 'root'
})
export class GdevMainService {

  constructor (
    private fs: AngularFirestore,
    private _alert: AlertService,
    private _router: Router
  ) {

   }

  addSiteInfo() {

  }

  async addContactDatos( datos: DatosContactoModel ) {

    await this.fs.collection( '_admin' ).ref.doc( 'datos_contacto' )
      .set( { ...datos }, { merge: true } )

    this._alert.sendFloatNotification('Datos guardados')
  }

  async getContactDatos() {
    var doc = await this.fs.collection( '_admin' ).ref.doc( 'datos_contacto' ).get()
    if ( doc.exists ) {
      return doc.data() as DatosContactoModel
    } else {
      throw {message:'No data geted' }
    }
  }

  async getStoreData() {
    var doc = await this.fs.collection( '_admin' ).ref.doc( 'datos_contacto' ).get()
    if ( doc.exists ) {
      return doc.data() as StoreModel
    } else {
      throw {message:'No data geted' }
    }
  }
}
