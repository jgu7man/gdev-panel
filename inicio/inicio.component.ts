import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GdevMainService } from '../gdev-main.service';

@Component({
  selector: 'gdev-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, OnDestroy {

  brandSubscription: Subscription
  constructor(
    private _admin: GdevMainService,
    private _meta: Meta
  ) {
    this.brandSubscription =
      this._admin.getBrandInfo().subscribe(info => {
        if (info) {
        }
      })
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.brandSubscription.unsubscribe();
  }

}
