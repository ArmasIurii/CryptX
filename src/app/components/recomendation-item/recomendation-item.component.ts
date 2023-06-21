import { Component, Input, OnInit, inject } from '@angular/core';
import { ApiDataService } from 'src/app/api-data.service';
import { CoinInterface } from 'src/app/coin.type';

@Component({
  selector: 'app-recomendation-item',
  templateUrl: './recomendation-item.component.html',
  styleUrls: ['./recomendation-item.component.scss'],
})
export class RecomendationItemComponent implements OnInit {

  @Input() data!: CoinInterface
  private apiData = inject(ApiDataService);

  elementData!: any;
  ngOnInit() {
    this.apiData.getData().subscribe((val) => (this.elementData = val[1]));
  }
}
