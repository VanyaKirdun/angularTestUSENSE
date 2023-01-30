import { AbstractControl,  Validators, ValidationErrors } from "@angular/forms";

export function createPasswordStrengthValidator(): Validators {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
          return null;
      }

      const hasLetters = /[a-zA-Zа-яА-Я]+/.test(value);
      const hasDigits = /[0-9]+/.test(value);
      const hasSymbols = /[/.(?!_)'@"%$\[\]\^+\\\|<>,;:&()*%#-]/.test(value);

      const passwordEasy = hasLetters || hasDigits || hasSymbols;
      const passwordMedium = (hasLetters && hasDigits) || (hasLetters && hasSymbols) || (hasDigits && hasSymbols);
      const passwordHard = hasLetters && hasDigits && hasSymbols;

      return !passwordHard ? {easy: passwordEasy, medium: passwordMedium, hard: passwordHard}: null;
  }
}
