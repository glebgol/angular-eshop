import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {
  static stockValidator(): ValidatorFn {
    return (control:AbstractControl ): ValidationErrors | null => {
      const value = control.value;

      const isValid = Number.isInteger(Number(value));
      console.log('1', value)
      return !isValid ? {isNotInteger:true}: null;
    }
  }
}
