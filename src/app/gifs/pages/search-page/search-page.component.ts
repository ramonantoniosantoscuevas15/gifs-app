import {  Component, inject } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.component.html',

})
export default class SearchPageComponent {
  gifService =  inject(GifService)
  onSearch(query:string){
    this.gifService.searchGifs(query)
  }
 }
