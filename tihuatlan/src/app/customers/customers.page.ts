/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  users:any = [];
  searchUser:any;
  permiso:boolean;

  constructor(
    private router: Router,
    private http: HttpClient

    ) { }

  ngOnInit() {
    this.permiso = true;
    this.getUsers().subscribe(res=>{
      console.log("Res: ", res);
      this.users = res;
      this.searchUser = this.users;
    });
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  getUsers(){
    return this.http
    .get('assets/files/customers.json')
    .pipe(
      map((res:any) =>{
        return res.data;
      })
    );
  }

  buscarClientes(event){
    const text = event.target.value;
    this.searchUser = this.users;
    if(text && text.trim() != ''){
      this.searchUser = this.searchUser.filter((user:any)=>{
        return (user.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
      });
    }
  }


}
