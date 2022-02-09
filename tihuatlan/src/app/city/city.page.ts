/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  id:any;
  finalId:number;
  cities:any = [];
  nombre:string;
  imagen:string;
  descripcion:string;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.finalId = this.id - 1;
    console.log("id",this.id);
    this.getCities().subscribe(res=>{
      console.log("Res: ", res);
      this.cities = res;
      this.nombre = this.cities[this.finalId].nombre;
      this.imagen = this.cities[this.finalId].imagen;
      this.descripcion = this.cities[this.finalId].descripcion;
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

}
