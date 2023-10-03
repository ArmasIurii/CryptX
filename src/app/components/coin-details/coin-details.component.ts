import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ApiDataService } from '../../api-data.service';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Subject, Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UrlDomainPipe } from '../../url-domain.pipe';


declare var bootstrap: any; // Declare Bootstrap


@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit, OnDestroy {

  coinPrice: Subject<any> = new Subject<any>()

  coinDetails: Subject<any> = new Subject<any>()

  coinExchangePrice: Subject<any> = new Subject<any>()

  progress: number = 50;
  filteredBlockchainSites: string[] = [];
  filteredCommunitySites: string[] = [];

  http = inject(HttpClient)
  apiService = inject(ApiDataService)
  route = inject(ActivatedRoute)


  dataPoints: any[] = [];
  timeout: any = null;
  xValue: number = 1;
  yValue: number = 10;
  newDataCount: number = 10;
  chart: any;
  currentCoinId!: any

  firstValue!: number
  secondValue!: number

  chartOptions = {
    animationEnabled: true,
    zoomEnabled: true,
    theme: "light2",
    title: {
      text: "Live Data"
    },
    axisY: {
      valueFormatString: "0.000"
    },
    data: [{
      type: "line",
      dataPoints: this.dataPoints
    }]
  }


  onCelsiusChange() {
    this.secondValue = (this.firstValue * 9 / 5) + 32;
  }

  onFahrenheitChange() {
    this.firstValue = (this.secondValue - 32) * 5 / 9;
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.currentCoinId = params.get('id'); // '+' is used to convert the string to a number

      this.getCoinDetails(this.currentCoinId)

    });

    this.coinDetails.subscribe(val => {

      this.filteredBlockchainSites = this.filterEmptyStrings(val.links.blockchain_site);
      this.filteredCommunitySites = this.filterEmptyStrings(val.links.official_forum_url);
    })
    console.log(this.dataPoints);

  }

  getCoinDetails(currentCoinId: any) {

    this.apiService.getCoinDetails(currentCoinId).subscribe((val) => {
      this.coinDetails.next(val)

      this.progress = this.getHighLow24(val.market_data)

    });

    this.apiService.getExchangeValue().subscribe((val) => {
      this.coinExchangePrice.next(val)

    });

  }

  getHighLow24(market: any): number {
    let progress = Math.round(((market.current_price.usd - market.low_24h.usd) / (market.high_24h.usd - market.low_24h.usd)) * 100)


    return progress > 2 ? progress : 2 // this was made because of API bug(sometimes value was negative)
  }

  getChartInstance(chart: object) {
    console.log(chart);
    
    this.chart = chart;
    this.updateData();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  updateData(period = 30) {
console.log(this.chartOptions);

this.apiService.getMarketGraph(this.currentCoinId, period).subscribe((val) => {
  this.addData(val.prices)
    }
    )
  }

  addData = (data: any) => {
    this.dataPoints = []
    if (this.newDataCount != 1) {
      data.forEach((val: any[]) => {

        this.dataPoints.push({ x: new Date(val[0]), y: parseFloat(val[1].toFixed(2)) });
        this.yValue = parseInt(val[1]);
      })
    } else {
      //this.dataPoints.shift();
      this.dataPoints.push({ x: data[0][0], y: parseInt(data[0][1 + 1]) });
      this.xValue++;
      this.yValue = parseInt(data[0][1]);
    }

    this.chartOptions.data[0].dataPoints = this.dataPoints

    this.chart.render();

  }

  filterEmptyStrings(array: string[]): string[] {

    return array.filter(item => !!item);

  }

}
