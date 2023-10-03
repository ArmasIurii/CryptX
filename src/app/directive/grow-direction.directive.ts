import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appGrowDirection]'
})
export class GrowDirectionDirective implements OnInit {
  @Input('appGrowDirection') appHighlight: any;

  constructor(private el: ElementRef) {
    // this.appHighlight.market_data.price_change_percentage_24h < 0 ? this.el.nativeElement.style.color = '#55b212' : this.el.nativeElement.style.color = '#e15241';
  }

  ngOnInit(): void {
    console.log('appHighlight ' + this.appHighlight);
    this.appHighlight > 0 ? this.el.nativeElement.style.color = '#55b212' : this.el.nativeElement.style.color = '#e15241';

  }
}
