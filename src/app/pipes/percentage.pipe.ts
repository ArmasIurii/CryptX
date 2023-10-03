import { Pipe, PipeTransform } from '@angular/core';
import { CoinInterface } from '../coin.type';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(element: CoinInterface, decimalPlaces: number = 2): string {

    const value = element?.price_change_24h / element?.current_price
    if (isNaN(value)) {
      return '';
    }

    value < 0.1 ? decimalPlaces = 2 : undefined
    return (value * 100).toFixed(decimalPlaces) + '%';
  }

}
