import { Directive, ElementRef, Renderer2 } from '@angular/core';
import './scroll-bar.style.scss';

@Directive({
  selector: '.recipes-container[scrollBarStyle]',
})
export class ScrollBarDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'scroll-bar');
  }
}
