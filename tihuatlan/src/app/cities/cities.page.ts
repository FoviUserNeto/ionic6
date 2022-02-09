/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

  cities:any = [];
  token = localStorage.getItem('token');

  constructor(
    private router: Router,
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    console.log("Token desde ciudades: ", this.token);
    //localStorage.removeItem('token');
    localStorage.clear();
    this.getCities().subscribe(res=>{
      console.log("Res: ", res);
      this.cities = res;
    });
  }

  getCities(){
    return this.http
    .get('assets/files/cities.json')
    .pipe(
      map((res:any) =>{
        return res.data;
      })
    );
  }

  async presentToast1(){
    const toast = await this.toastController.create({
      message: 'Ciudad seleccionada',
      duration:2000,
      position:"bottom"
    });

    toast.present();
  }

  async presentAlert1(){
    const alert = await this.alertController.create({
      header:'Eliminar ciudad',
      message: 'Se ha borrado la ciudad seleccionada',
      buttons:["OK"]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async presentAlert2(){
    const alert = await this.alertController.create({
      header:'Eliminar ciudad',
      message: 'Desea eliminar la ciudad seleccionada?',
      buttons:[{
        text: 'No',
        handler: ()=>{
          console.log("No cancelar");
        }
      },
      {
        text: 'Si',
        handler: ()=>{
          console.log("Eliminado");
        }
      }
    ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

}
