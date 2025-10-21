import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gifs-gif-list',
  imports: [],
  templateUrl: './gif-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifList { }
