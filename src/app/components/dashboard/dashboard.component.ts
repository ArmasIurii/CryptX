import { Component, OnInit, inject } from '@angular/core';
import { Subject} from 'rxjs';
import { ApiDataService } from 'src/app/api-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  apiDataService = inject(ApiDataService);

  apiResponseSubject: Subject<any> = new Subject<any>();
  recomendations: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.apiDataService.getData().subscribe((val) => {
      this.apiResponseSubject.next(val.slice(0, 10));
      this.recomendations.next(
        val
          .sort(
            (
              a: { price_change_percentage_24h: number },
              b: { price_change_percentage_24h: number }
            ) => {
              const priceChangeA = Math.abs(a.price_change_percentage_24h);
              const priceChangeB = Math.abs(b.price_change_percentage_24h);

              if (priceChangeA > priceChangeB) {
                return -1;
              } else if (priceChangeA < priceChangeB) {
                return 1;
              } else {
                return 0;
              }
            }
          )
          .slice(0, 4)
      );
    });
  }

  displayedColumns: string[] = [
    'position',
    'name',
    '24h_price_change',
    'market_cap',
    'current_price',
    'trade',
  ];
}
