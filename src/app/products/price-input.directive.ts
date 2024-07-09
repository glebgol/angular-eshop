import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[appPriceInput]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PriceInputDirective,
    multi: true
  }]
})
export class PriceInputDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.createPriceInputValidator()(control);
  }

  createPriceInputValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

      const number: number = control.value;

      const valid = number > 0 && (Number.isInteger(number) || this.hasLessThanThreeDigitsAfterDot(number));

      const error = (number <= 0) ? 'Price should be positive' :
        'Price should be an integer of fractional numbers with 1 or 2 digits after dot';

      return !valid ? { priceInvalid: error }: null;
    }
  }

  private hasLessThanThreeDigitsAfterDot(number: number) {
    const numStr = number.toString();

    const decimalIndex = numStr.indexOf('.');
    if (decimalIndex === -1) {
      return true;
    }

    const decimalPlaces = numStr.length - decimalIndex - 1;
    return decimalPlaces >= 0 && decimalPlaces <= 2;
  }
}
