import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validPasswordConfirmation } from './util/passwordValid';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  errorMessage: any;
  formErrors = {
    email: [
      { type: 'required', message: 'EL correo es obligatorio.' },
      { type: 'email', message: 'Introduce un correo electrónico válido.' }
    ],
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener al menos 3 caracteres.' }
    ],
    lastname: [
      { type: 'required', message: 'El apellido es obligatorio' },
      { type: 'minlength', message: 'El apellido debe tener al menos 3 caracteres.' }
    ],
    username: [
      { type: 'required', message: 'El nombre de usuario es obligatorio' },
      { type: 'minlength', message: 'El nombre de usuario debe tener al menos 6 caracteres.' }
    ],
    password: [
      { type: 'required', message: 'Se requiere contraseña' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' }
    ],
    passwordConfirmation: [
      { type: 'required', message: 'El apellido es obligatorio' },
      { type: 'validPasswordConfirmation', message: 'La contraseña no coincide' }
    ],

  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) { 
   
      this.registerForm = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])),
        lastname: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        username: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        passwordConfirmation: new FormControl('', Validators.compose([
          Validators.required
        ]), )
      });

      this.registerForm.get('password')?.valueChanges.subscribe(password => {
        const passwordConfirmationControl = this.registerForm.get('passwordConfirmation');
        passwordConfirmationControl?.setValidators([Validators.required, validPasswordConfirmation(password)]);
        passwordConfirmationControl?.updateValueAndValidity();
      });
  }

  ngOnInit() {
  }


  registerUser(registerData: any) {
    this.authService.register(registerData).then(res => {
      console.log(res);
      this.errorMessage = '';
      this.navCtrl.navigateForward('/login');
    }).catch(err => {
      console.log(err);
      this.errorMessage = `Falta llenar campos`;
    });
  }

}
