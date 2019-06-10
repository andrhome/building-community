import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

export function matchPasswords(password: string, repeatPassword: string): boolean {
  if (password !== '') {
    const n = password.localeCompare(repeatPassword);
    return n === 0;
  }
}

export function getValidImgPath(path: string = '') {
  const imgPathRegExp = /\/uploads.+/;

  return (path && path.match(imgPathRegExp))
    ? `${environment.baseUrl}`.replace(/com\/api/, `com${path.match(imgPathRegExp)[0]}`)
    : path;
}

export function getErrorMessage(form: FormGroup, fieldName: string = ''): string {
  const field = form.controls[fieldName];
  if (field && field.invalid) {
    if (field.errors['required']) {
      return 'Field is required';
    }
    if (field.errors['minlength']) {
      return 'Length is invalid';
    }
    if (field.errors['email']) {
      return 'Email is invalid';
    }
    if (field.errors['pattern']) {
      return 'Field is invalid';
    }
  }

  return '';
}
