import { Component, OnInit, Input } from '@angular/core';
import { Routes } from './../../models/route';
import { AppSettings } from './../../constants/app-settings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public routes: Array<Routes> = AppSettings && AppSettings.getRoutes;

  constructor() { }

  ngOnInit(): void { }

}
