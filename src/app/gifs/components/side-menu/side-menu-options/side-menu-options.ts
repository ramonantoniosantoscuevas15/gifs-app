import {  Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";


interface MenuOptions{
  label:string;
  sublabel: string;
  route: string;
  icon:string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './side-menu-options.html',

})
export class SideMenuOptions {
  menuOptions:MenuOptions[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Treading',
      sublabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      sublabel: 'Buscar gifs',
      route: '/dashboard/search'
    },
  ]
}
