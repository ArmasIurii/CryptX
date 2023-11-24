import { Component, OnInit, inject } from '@angular/core';
import { ApiDataService } from 'src/app/api-data.service';
import { CoinInterface } from 'src/app/coin.interface';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  demo = false
  apiService = inject(ApiDataService)
  coinData!: CoinInterface
  selectedText: string = 'General';

  ngOnInit(): void {
    this.apiService.coinDetails.subscribe(value => this.coinData = value )
  }
  updateInfo(newText: string): void {
    // this.infoText = this.coinDetails.subscribe(val => );
  }


  openLink(url: string) {
    window.open(url)
  }


  showDialog(text: string): void {
    this.selectedText = text;
  }
}
