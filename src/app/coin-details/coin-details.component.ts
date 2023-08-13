import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Subject, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit, OnDestroy {

  coinPrice = new Subject

  http = inject(HttpClient)
  apiService = inject(ApiDataService)


  dataPoints: any[] = [];
  timeout: any = null;
  xValue: number = 1;
  yValue: number = 10;
  newDataCount: number = 10;
  chart: any;
  solana!: number

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

  ngOnInit() {

    this.getCoinPrice()

  }

  getCoinPrice() {
    console.log('getCoinPrice');
    this.apiService.getCoinPrice().subscribe((val) => {
      this.coinPrice.next(val.solana.usd), console.log(val.solana.usd);
    });

  }

  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateData();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  updateData = () => {
    this.apiService.getMarketGraph().subscribe((val) => { this.addData(val.prices) }
    )
  }

  addData = (data: any) => {
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
    this.newDataCount = 1;
    this.chart.render();

  }
}
