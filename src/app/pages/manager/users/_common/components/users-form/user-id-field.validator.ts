import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Проверка, что заполнен хотя бы один идентификатор пользователя - номер телефона,
 * электропочта или логин
 * @returns A ValidatorFn.
 */
export function requiredUserIdField (control: AbstractControl): ValidationErrors | null {
    const login = control.get('username');
    const email = control.get('email');
    const phone = control.get('phone');

    if (login && email && phone && (login.value || email.value || phone.value)) {
      return null;
    }

    return { requiredUserIdField: true };
}
