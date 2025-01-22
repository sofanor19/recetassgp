import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validPasswordConfirmation(password: string): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const confirmPassword = control.value;

    // Si alguno de los dos controles no existe, no validamos
    if (!password || !confirmPassword) {
      return null;
    }
  
    // Si las contraseñas no coinciden
    if (confirmPassword !== password) {
      return { 'validPasswordConfirmation': true };
    }
  
    return null; // Si las contraseñas coinciden
  }
}