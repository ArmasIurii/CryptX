import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Subject, Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit, OnDestroy {

  coinPrice: Subject<any> = new Subject<any>()

  coinDetails: Subject<any> = new Subject<any>()

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

    this.route.paramMap.subscribe(params => {
      this.currentCoinId = params.get('id'); // '+' is used to convert the string to a number
      // this.getCoinPrice( this.currentCoinId)

      this.getCoinDetails(this.currentCoinId)
      this.getCoinPrice(this.currentCoinId)
    });



  }

  getCoinPrice(currentCoinId: any) {

    this.apiService.getCoinPrice(currentCoinId).subscribe((val) => {
      this.coinPrice.next(val[this.currentCoinId].usd), console.log(val[this.currentCoinId].usd);

    });
  }

  getCoinDetails(currentCoinId: any) {

    this.apiService.getCoinDetails(currentCoinId).subscribe((val) => {
      this.coinDetails.next(val), console.log(val);
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
    this.apiService.getMarketGraph(this.currentCoinId).subscribe((val) => { this.addData(val.prices) }
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
