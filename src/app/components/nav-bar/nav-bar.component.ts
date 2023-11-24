import { Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, inject } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime, filter, map, skip, switchMap, takeUntil, tap } from 'rxjs';
import { ApiDataService } from 'src/app/api-data.service';
import { CoinInterface } from 'src/app/coin.interface';
import { EventsService } from 'src/app/events.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  searchQuery!: string
  isOpen!: boolean
  searchData: Subject<any> = new Subject

  searchApi = inject(ApiDataService)
  elementRef = inject(ElementRef)
  eventsService = inject(EventsService)

  #destroy$: Subject<void> = new Subject<void>();

  @ViewChild('dropdown', { static: true, read: ElementRef }) dropdown!: ElementRef;

  isDropOpen$ = new BehaviorSubject(false);

  @ViewChildren('inputListener', { read: ElementRef }) inputListeners!: QueryList<ElementRef>;

  ngOnInit() {

    this.eventsService.documentClick$.pipe(
      filter(() => this.isDropOpen$.value),
      tap(val => {
        if (!this.inputListeners.some((el) => el.nativeElement.contains(val.target))) {
          this.isDropOpen$.next(false)
        }
      })
    ).subscribe()

  }
 
  onSearch(query: string) {
    this.searchQuery = query; // Update the local query variable
    this.searchApiData(); // Fetch data when the query changes
  }

  openDropDown(searchQuery: string = '') {
    this.isDropOpen$.next(true);
    this.onSearch(searchQuery);
  }

  searchApiData() {
    this.searchApi
      .getSearchData(this.searchQuery)
      .pipe(
        debounceTime(1000),
        takeUntil(this.#destroy$),
        tap(() => console.log('clicks'))
      )
      .subscribe((val) => {
        const filteredData = val.coins.filter(
          (item: { market_cap_rank: number; name: string; large: string }) =>
            item['market_cap_rank'] < 1000
        );
        this.searchData.next(filteredData.slice(0, 7));
      });

      //ask about if on each function call is an additional subscribe and why debounce doent work
  }


  ngOnDestroy() {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
