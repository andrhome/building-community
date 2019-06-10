import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Constants } from '../../services/constants.service';
import { getErrorMessage } from '../../services/helper-functions';

@Component({
  selector: 'bc-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  invalidCredentials = false;
  signInForm = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern(Constants.emailRegExp)
      ]),
    password: new FormControl('',
      [Validators.required]),
    keepMeLogged: new FormControl()
  });

  constructor(public auth: AuthService) {
    this.auth.clearAuthData();
  }

  ngOnInit() {
  }

  errorMessageHandle(form: FormGroup, fieldName: string = '') {
    return getErrorMessage(form, fieldName);
  }

  submit() {
    if (this.signInForm.invalid) {
      return;
    }
    this.auth.signIn(this.signInForm.value).subscribe(() => {
    }, err => {
      this.invalidCredentials = true;
    });
  }
}
