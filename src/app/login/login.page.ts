import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
 loginForm: FormGroup;
 errorMessage: any;
 formErrors = {
  email: [
    { type: 'required', message:'El email es obligatorio' },
    { type: 'email', message:'El email no es valido' }
  ],
  password: [
    { type: 'required', message:'La contraseña es obligatoria'},
    { type: 'password', message:'La contraseña es de minimo 6 caracteres'}
  ]
}
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
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

  loginUser (credentials:any){
    this.authService.login(credentials).then(res=> {
      console.log(res);
      this.errorMessage = '';
      this.storage.set ('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/home');
    }).catch(err =>{
      this.errorMessage = err;
    });
  }

}
