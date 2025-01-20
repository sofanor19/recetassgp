import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(credentials: any) {
    console.log(credentials, "desde el servicio");
    return new Promise((accept, reject) => {
      if (credentials.email === 'sgarciap@gmail.com') {
        if (credentials.password === 's1234') {
          accept('Login correcto');
        } else {
          reject('Contraseña incorrecta');
        }
      } else {
        reject('Email incorrecto');
      }
    });
  }
}
