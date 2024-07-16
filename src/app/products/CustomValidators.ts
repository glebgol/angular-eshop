import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {
  static numberValidator(): ValidatorFn {
    return (control:AbstractControl ): ValidationErrors | null => {
      const value = control.value;

      const isValid = !!Number(value) || value == null || value == '' || value == '0';

      return !isValid ? {notNumber:true}: null;
    }
  }
}
