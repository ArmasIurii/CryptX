import { Component, OnDestroy, OnInit, inject, ViewChild } from '@angular/core';
import { ApiDataService } from '../../api-data.service';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Subject, Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UrlDomainPipe } from '../../url-domain.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { ConverterComponent } from '../converter/converter.component';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit, OnDestroy {

  coinPrice: Subject<any> = new Subject<any>()

  coinDetails: Subject<any> = new Subject<any>()

  coinMarketPrice: Subject<any> = new Subject<any>()

  coinExchangePrice: Subject<any> = new Subject<any>()

  infoText: string = 'Default Information';

  @ViewChild(ConverterComponent) converter!: ConverterComponent


  progress: number = 50;
  filteredBlockchainSites: string[] = [];
  filteredCommunitySites: string[] = [];

  http = inject(HttpClient)
  apiService = inject(ApiDataService)
  route = inject(ActivatedRoute)
  sanitizer = inject(DomSanitizer)

  chartPeriod = [
    { label: '24h', period: 1, selected: false },
    { label: '7d', period: 7, selected: false },
    { label: '14d', period: 14, selected: false },
    { label: '30d', period: 30, selected: true },
    { label: '90d', period: 90, selected: false },
    { label: '180d', period: 180, selected: false },
    { label: '1year', period: 365, selected: false },
  ]


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

  updateInfo(newText: string): void {
    // this.infoText = this.coinDetails.subscribe(val => );
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

  openLink(url: string) {
    window.open(url)
  }

  getCoinDetails(currentCoinId: any) {

    this.apiService.getCoinDetails(currentCoinId).subscribe((val) => {
      this.coinDetails.next(val)
      this.converter.coinDetails.next(val)
      console.log(val);

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
    this.updateGraphData();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  updateGraphData(period = 30) {
    console.log(this.chartOptions);

    this.apiService.getMarketGraph(this.currentCoinId, period).subscribe((val) => {
      this.addData(val.prices)
    }
    )
    this.chartPeriod.forEach(button => {
      button.selected = button.period === period;
    });
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
