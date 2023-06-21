import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CoinInterface } from './coin.type';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins';
  private apiUrlMainData = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&sparkline=false';

  http = inject(HttpClient);

  apiResponseSubject: Subject<CoinInterface[]> = new Subject<any>();
  recomendations!:CoinInterface[]

  getData(): Observable<any> {
    const url = this.apiUrlMainData;
    return this.http.get<any>(url);
  }

  getTableData() {
    const url = this.apiUrlMainData;

    return this.http.get<any>(url).subscribe((val) =>
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
  }
  getRecomendations() {
    const url = this.apiUrlMainData;

    return this.http.get<any>(url)
  }
}
