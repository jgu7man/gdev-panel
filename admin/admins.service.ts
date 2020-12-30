import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { AdminInterface, AdminRol } from './admin.model';
import { CacheService } from '../../gdev-tools/cache/cache.service';
import { Router } from '@angular/router';
import { AlertService } from '../../gdev-tools/alerts/alert.service';
import { ErrorAlertModel } from '../../gdev-tools/alerts/alerts.model';
import * as firebase from 'firebase/app';
import { GdevMainService } from '../gdev-main.service';
import { DatosContactoModel } from '../contacto/contacto.model';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  store:DatosContactoModel

  admin$ = new Observable<any>()
  currentAdmin: AdminInterface
  admins$: Observable<AdminInterface[]> = new Observable()
  adminList: AdminInterface[] = []

  roles: AdminRol[] = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'editor', viewValue: 'Editor' },
    { value: 'colab', viewValue: 'Colaborador' },
  ]

  constructor (
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private _cache: CacheService,
    private router: Router,
    private _alert: AlertService,
    private _main: GdevMainService
  ) {
    this.getAdmins()
    this.getCurrentAdmin()
    this.admin$ = this.auth.authState.pipe(
      switchMap( admin => {
        return admin
        ? this.fs.doc<AdminInterface>( `admins/${ admin.uid }` ).valueChanges()
          : of(null)
        })
        )
      }

      
  getCurrentAdmin() {
    this.admin$.subscribe( admin => {
      console.log(admin);
      this.currentAdmin = admin
    })
  }

  get adminsRef() {
    return this.fs.collection('admins').ref
  }
  
  
  async pretendCreateAdmin( admin: AdminInterface) {
    this.store = await this._main.getContactDatos()
    var adminFinded = this.adminList
      .find( a => a.email == admin.email )
    
      if ( adminFinded ) {
        this._alert.sendMessageAlert('Este correo ya está en uso, por favor elige otro')
      } else {

        this.adminsRef.doc(admin.email).set(admin)

    
        this.fs.collection( 'mails' ).ref.add( {
          to: admin.email,
          message: {
            subject: 'Invitación a administrar ' + this.store.store_name,
            text: `Se te ha invitado a ser ${ admin.rol } de ${ this.store.store_name }\n
            Por favor da click en el siguiente enlace:\n
            https://${this.store.store_name}.web.app/panel/create`
          }
        } )
        
        this._alert.sendFloatNotification('Se ha envido un correo al usuario nuevo')
      }
      return
    
  }


  
  async createAdmin(email: string, password: string) {
    
    const admin: AdminInterface = await ( await this.adminsRef.doc( email )
      .get() ).data() as AdminInterface
    
    if ( !admin ) {
      this._alert.sendMessageAlert( 'Lo sentimos, no esperamos una confirmación con esta dirección de email. Revisa que esté bien o itenta con otra. Si aún así no logras ingresar, ponte en contacto con un administrador del sitio' )
    } else {

      try {

        var nuevoAdmin = await this.auth
          .createUserWithEmailAndPassword( email, password );
        admin.uid = nuevoAdmin.user.uid
        
        this.updateUserData( admin )
        this.adminsRef.doc(email).delete()
        
        this.router.navigate(['/panel'])
        return
      } catch ( error ) {
        console.error( error );
        this.setErrorMsj( error )
      }
    }
  }







  async adminLogin( email, pwd ) {
    try {
      var credential = await this.auth.signInWithEmailAndPassword( email, pwd )
      this.router.navigate(['/panel'])
      return this.updateUserData( credential.user )
    } catch ( error ) {
      console.log( error )
      if ( error.code === 'auth/user-not-found' ) {
        this._alert.sendMessageAlert( 'Correo electrónico no identificado' )
      } else if ( error.code === 'auth/wrong-password') {
        this._alert.sendMessageAlert( 'Contraseña incorrecta' )
      } else {
        this.setErrorMsj(error)
      }
    }
  }

  private async updateUserData( {uid, email, displayName, rol}: AdminInterface ) {
    const adminRef: AngularFirestoreDocument<AdminInterface>
      = this.fs.doc( `admins/${ uid }` );
    console.log( { uid, email });
    adminRef.set( { uid, email }, { merge: true } )
    this._cache.updateData( 'admin', { uid, email, displayName, rol } )
  }


  async updateAdmin(admin: AdminInterface) {
    this.fs.collection('admins').ref.doc(admin.uid).update(admin)
  }


  async changePassword(email) {
    this.auth.sendPasswordResetEmail( email ).then( () => {
      this._alert.sendFloatNotification(`Se ha enviado un correo a ${email} para confirmar el cambio`)
    })
  }


  getAdmins() {
    this.admins$ = this.fs.collection<AdminInterface>( 'admins' ).valueChanges()
    this.admins$.subscribe( res => this.adminList = res )
  }


  //? Cerrar sesión

  async singOut() {
    await this.auth.signOut();
    return this.router.navigate( [ '/' ] );
  }


  setErrorMsj( error: any ) {
    let errorObj = new ErrorAlertModel( '', error.code )
    if ( error.code.includes( 'not-found' ) ) {
      errorObj.mensaje = 'No se encontró el email'
    }
    if ( error.code.includes( 'invalid' ) ) {
      errorObj.mensaje = 'Escribe una direccion de correo válida'
    }
    if ( error.code.includes( 'wrong-password' ) ) {
      errorObj.mensaje = 'Contraseña incorrecta'
    }

    this._alert.errorAlert$.next( errorObj )
    
  }


  revokePermission(adminId: string) {
    this.fs.collection( 'admins' ).ref
    .doc(adminId).update({rol: 'revoke'})
  }
  


}
