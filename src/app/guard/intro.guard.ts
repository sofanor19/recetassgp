import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn : 'root'
})

export class introGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router){}
 async canActivate(){
  const isIntroshowed = await this.storage.get(`viLaIntro`);
  if (isIntroshowed){
    return true;
  }else{
    this.router.navigateByUrl('/intro')
    return true;
  }
 }
}
