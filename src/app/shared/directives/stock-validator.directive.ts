import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {CustomValidators} from "../validators/custom.validators";

@Directive({
  selector: '[appStockValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: StockValidatorDirective,
      multi: true,
    },
  ]
})
export class StockValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.stockValidator()(control);
  }
}
