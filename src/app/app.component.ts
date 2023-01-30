import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from './validators/createValidator.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hide = true;

  section1 = 'gray';
  section2 = 'gray';
  section3 = 'gray';

  form: FormGroup;


  constructor(private fb: FormBuilder) {
    this._createForm()
  }

  private _createForm() {
    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.minLength(8),
          createPasswordStrengthValidator()
        ],
      ],
    })
  }

  get _password() {
    return this.form.get('password')
  }

  onChange(){
    if(!this._password?.errors){
      this.section1 = this.section2 = this.section3 = 'green';
    }else if(this._password?.errors?.['minlength']){
      this.section1 = this.section2 = this.section3 = 'red';
    } else if(this._password?.errors?.['medium']){
      this.section1 = this.section2 = 'yellow';
      this.section3 = 'gray';
    } else if(this._password?.errors?.['easy']){
      this.section1 = 'red';
      this.section2 = this.section3 = 'gray';
    } else if(this._password.value === ''){
      this.section1 = this.section2 = this.section3 = 'gray';
    }
  }
}
