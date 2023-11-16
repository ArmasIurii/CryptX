import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

interface Food {
  value: string;
  viewValue: string;
}

interface CoinData {
  market_data: {
    usd: number;
    // Add other properties as needed
  };
  // Add other properties as needed
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements AfterViewInit {

  fromCurrency!: number;
  toCurrency!: number;
  result: number | null = null;
  coinDetails = new Subject<any>()
  valuteList!: string[]
  selectedValute: string = 'USD';
  exchangeRates!: any

  coinConvert = new FormControl();

  ngAfterViewInit(): void {
    this.coinDetails.subscribe(val => {
      this.valuteList = Object.keys(val.market_data.current_price).map(val => val.toUpperCase())
      this.exchangeRates = val.market_data.current_price
      this.coinConvert.setValue(this.selectedValute);
      //TODO unsubscribe
    })
  }
  convertToCurrency() {
    const conversionRate = this.exchangeRates[this.coinConvert.value.toLowerCase()];    
    this.toCurrency = this.fromCurrency * conversionRate;
  }

  convertFromCurrency() {
    const conversionRate = this.exchangeRates[this.coinConvert.value.toLowerCase()];
    this.fromCurrency = this.toCurrency / conversionRate;
  }
}
