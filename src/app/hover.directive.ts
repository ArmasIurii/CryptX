import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[hoverEffect]'
})
export class HoverDirective {

  el = inject(ElementRef)
  renderer = inject(Renderer2)

  @HostListener('mouseenter') onMouseEnter() {
    this.setStyles('rgba(64, 64, 64, 0.37)', '0.3s');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setStyles('transparent', '0.3s');
  }

  private setStyles(color: string, transition: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    this.renderer.setStyle(this.el.nativeElement, 'transition', `background-color ${transition}`);
  }
}
