import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appStockAvailabilityStyle]',
})
export class StockAvailabilityStyleDirective {
  @Input() appStockAvailabilityStyle: number = 1;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const element = this.elementRef.nativeElement
    if (this.appStockAvailabilityStyle > 10) {
      element.style.color = 'green';
      element.innerHTML = 'In stock';
    } else if (this.appStockAvailabilityStyle > 0) {
      element.style.color = '#bb7b00';
      element.innerHTML = 'Almost sold out';
    } else {
      element.style.color = 'gray';
      element.innerHTML = 'Sold out';
    }
  }

}
