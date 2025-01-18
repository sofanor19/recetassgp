import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
 LoginForm: FormGroup;
 errormessage: any;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.LoginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl ('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    })
  }
   

  ngOnInit() {
  }

}
