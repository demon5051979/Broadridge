import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[onlyNumber]'
})
export class NumberOnlyDirective {
  public constructor(private el: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  public onInput(value: string): void {
    this.el.control.patchValue(value.replace(/[^0-9]/g, ''));
  }
}
