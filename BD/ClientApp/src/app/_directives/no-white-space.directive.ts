import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[noWhiteSpace]'
})
export class NoWhiteSpaceDirective {
  public constructor(private el: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  public onInput(value: string): void {
    this.el.control.patchValue(value.replace(/\s/g, ''));
  }
}
