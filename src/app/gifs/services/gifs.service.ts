import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'
  const gifs = JSON.parse(gifsFromLocalStorage)

  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);
  treandingGifs = signal<Gif[]>([]);
  treandingGifsLoading = signal(false);
  private trendingPage = signal(0)

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = []

    for (let i = 0; i < this.treandingGifs().length; i += 3) {
      groups.push(this.treandingGifs().slice(i, i + 3))
    }


    return groups;
  })
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTreadingGifs()
  }
  saveGifsTolocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString)
  })
  loadTreadingGifs() {
    if (this.treandingGifsLoading()) return;
    this.treandingGifsLoading.set(true)
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyapiKey,
        limit: 20,
        offset: this.trendingPage() * 20,

      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.treandingGifs.update(currentGifs => [
        ...currentGifs,
        ...gifs
      ])
      this.trendingPage.update(current => current +1)
      this.treandingGifsLoading.set(false)


    })

  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyapiKey,
          limit: 20,
          q: query
        }
      }).pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        //Todo: historial

        tap(items => {
          this.searchHistory.update(history => ({
            ...history,
            [query.toLocaleLowerCase()]: items
          }))
        })
      );

    //.subscribe((resp)=>{
    //const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //console.log({search: gifs})

    //})
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? []
  }

}
