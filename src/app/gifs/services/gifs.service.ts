import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient);
  treandingGifs = signal<Gif[]>([]);
  treandingGifsLoading = signal(true);

  constructor(){
    this.loadTreadingGifs()
  }
  loadTreadingGifs(){
    this.http.get<GiphyResponse>(`${environment.giphyUrl }/gifs/trending`,{
      params:{
        api_key: environment.giphyapiKey,
        limit:20

      }
    }).subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.treandingGifs.set(gifs)
      this.treandingGifsLoading.set(false)
      console.log(gifs)

    })

  }

  searchGifs(query: string){
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params:{
        api_key: environment.giphyapiKey,
        limit:20,
        q: query
      }
    }).subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      console.log({search: gifs})

    })
  }

}
