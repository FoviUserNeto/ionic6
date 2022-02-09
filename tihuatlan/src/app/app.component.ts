import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Clientes', url: '/customers', icon: 'people' },
    { title: 'Ciudades', url: '/cities', icon: 'location' },
    { title: 'Login', url: '/login', icon: 'log-in' },
  ];
  constructor() {}
}
