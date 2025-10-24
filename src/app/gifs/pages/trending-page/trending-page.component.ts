import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';


@Component({
  selector: 'app-trading-page',
  //imports: [GifList],
  templateUrl: './trending-page.component.html',

})
export default class TradingPageComponent implements AfterViewInit {

  gifService = inject(GifService)
  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.treandingScrollstate()
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight
    const scrollHeight = scrollDiv.scrollHeight

    //console.log({scrollTop,clientHeight,scrollHeight})

    const isAtBottom = scrollTop + clientHeight + 300 > scrollHeight
    this.scrollStateService.treandingScrollstate.set(scrollTop)

    if (isAtBottom) {
      this.gifService.loadTreadingGifs()
    }


  }


}
