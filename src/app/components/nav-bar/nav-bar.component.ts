import { Component, inject } from '@angular/core';
import { ApiDataService } from 'src/app/api-data.service';
import { CoinInterface } from 'src/app/coin.type';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  searchQuery!: string
  searchData!: CoinInterface[]
  openDropDown = false

  searchApi = inject(ApiDataService)

  onSearch() {

    this.searchApi.getSearchData(this.searchQuery).subscribe((val: any) => {
      console.log(val.coins.filter((val:any) => {
        this.searchData  = val;

        return val['market_cap_rank'] < 1000 && val['market_cap_rank']
      }));

    })
  }
  onInputFocus(){
    this.openDropDown = true
  }
  onInputBlur(){
    this.openDropDown = false
  }
}
