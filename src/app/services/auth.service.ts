import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(credentials: any) {
    console.log(credentials, "desde el servicio");
    return new Promise((accept, reject) => {
      if (credentials.email === 'sgarciap@gmail.com' && credentials.password === 's123456') {
          accept('Login correcto');
        } else {
          reject('Contraseña incorrecta');
        }
      
    });
  }
}
