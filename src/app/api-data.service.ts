import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CoinInterface } from './coin.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  private backEndUrl = 'http://localhost:4000'; // Replace with your actual backend URL

  private apiUrl = 'https://api.coingecko.com/api/v3/coins';
  private coinDetailsUrl = 'https://api.coingecko.com/api/v3/coins/{id}';
  private exchangeRatesUrl = 'https://api.coingecko.com/api/v3//exchange_rates';

  private apiUrlMainData = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&sparkline=false';
  private apiUrlMarketGraph = 'https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days={period}';
  private apiSearch = 'https://api.coingecko.com/api/v3/search?query={id}'

  coinDetails = new Subject<CoinInterface>()

  http = inject(HttpClient);

  apiResponseSubject: Subject<CoinInterface[]> = new Subject<any>();

  recomendations!: CoinInterface[]

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

  getCoinDetails(coinPathId: any) {
    const url = this.coinDetailsUrl.replace('{id}', coinPathId.toString())
    this.http.get<CoinInterface>(url).subscribe(val => this.coinDetails.next(val))

    return this.http.get<any>(url)
  }

  getMarketGraph(coinPathId: any, period: number) {
    const url = this.apiUrlMarketGraph.replace('{id}', coinPathId.toString()).replace('{period}', period.toString())
    return this.http.get<any>(url, { responseType: 'json' })
  }

  getExchangeValue() {
    return this.http.get<any>(this.exchangeRatesUrl)
  }

  getSearchData(coinId: string) {
    const url = this.apiSearch.replace('{id}', coinId)
    return this.http.get<any>(url)
  }

  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    const loginUrl = `${this.backEndUrl}/login`; // Your login API endpoint

    return this.http.post(loginUrl, data);
  }
}
