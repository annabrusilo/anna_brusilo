import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Directive({
  selector: '[slFocusOonFirstInvalidElement]'
})

export class FocusOnFirstInvalidElementDirective {
  @Input() formGroup: FormGroup;

  constructor(private el: ElementRef) {
  }

  @HostListener('submit', ['$event'])
  public onSubmit() {
    if (!this.formGroup.valid) {
      const invalidControls = this.el.nativeElement.querySelectorAll('form .ng-invalid');
      if (invalidControls && invalidControls.length) {
        invalidControls[0].focus();
      }
    }
  }
}