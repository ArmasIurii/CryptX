import { Component, OnInit, inject } from '@angular/core';
import { ApiDataService } from 'src/app/api-data.service';
import { CoinInterface } from 'src/app/coin.type';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss'],
})
export class RecomendationComponent implements OnInit{

  recomendationArray!:CoinInterface[]

  private apiService = inject(ApiDataService)

  ngOnInit(){
    this.apiService.getData().subscribe((val) =>{
    this.recomendationArray = val.sort(
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
        
        console.log(this.recomendationArray)}
      )
  } 
}