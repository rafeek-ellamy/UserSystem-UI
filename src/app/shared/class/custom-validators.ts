import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class CustomValidators {
   static validStringRegex = /^[^*|\":<>[\]{}`\\()';@&$]+$/;
   static emailPattern:string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
   static validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,16}$/;
   static englishArabicNoNumbersPattern = /^[\p{L}A-Za-z\s]+$/u;
   static validStringForEmailRegex = /^[^*|\":<>[\]{}`\\()';&$]+(?:@[^*|\":<>[\]{}`\\()';&$]+)?$/;
   static saPattern = /^SA[0-9]{22}$/;

   static isValidPhoto(file: File): boolean {
      const allowedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
      return allowedExtensions.includes(file.type);
   }
}

export function hasError(formGroup: FormGroup,controlName: string, errorName: string) {
    if (!formGroup) return false;
    return formGroup.controls[controlName].hasError(errorName)&&
    (formGroup.controls[controlName].dirty || formGroup.controls[controlName].touched);
}






