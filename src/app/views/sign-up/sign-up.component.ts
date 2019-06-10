import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../services/constants.service';
import { getErrorMessage } from '../../services/helper-functions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'bc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  invalidCredentials = false;
  signUpForm = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern(Constants.emailRegExp)
      ]),
    plainPassword: new FormControl('',
      [Validators.required]),
    agreeTerms: new FormControl('', Validators.required)
  });
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  errorMessageHandle(form: FormGroup, fieldName: string = '') {
    return getErrorMessage(form, fieldName);
  }

  submit() {
    if (this.signUpForm.invalid) {
      return;
    }
    const submittedData = {
      email: this.signUpForm.value.email,
      plainPassword: this.signUpForm.value.plainPassword
    };

    this.auth.signUp(submittedData).subscribe();
  }

}
