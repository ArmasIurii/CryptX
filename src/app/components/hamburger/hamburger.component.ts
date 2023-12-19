import { Component } from '@angular/core';
import { ThemingService } from 'src/app/theming.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent {
  // themeService = inject(ThemingService)
  constructor(public themeService: ThemingService){}

  onToggle(){
    let currentIsDarkValue = this.themeService.isDarkTheme$.value
    this.themeService.isDarkTheme$.next(!currentIsDarkValue)
    this.themeService.setTheme(this.themeService.getCurrentTheme())
  }

  setTheme(theme:string){
    this.themeService.setTheme(theme)
  }
}
