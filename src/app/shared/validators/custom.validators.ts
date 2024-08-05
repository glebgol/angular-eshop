import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {
  static stockValidator(): ValidatorFn {
    return (control:AbstractControl ): ValidationErrors | null => {
      const value = control.value;

      const isValid = Number.isInteger(Number(value));
      return !isValid ? {isNotInteger:true}: null;
    }
  }
}
