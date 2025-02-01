import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController, ModalController } from '@ionic/angular';
import { EditAccountModalPage } from '../edit-account-modal/edit-account-modal.page';


defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    email: '',
    image: '',
    followees: [],
    followers: []
  };
  
  constructor(
    private userService: UserService,
    private storage: Storage,
    public  alertController: AlertController,
    private modalController: ModalController
   
  ) { }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user,"usuario");
    this.userService.getUser(user.id).then(
      (data:any)=>{
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch(
      (error) => {
        console.log(error);
      });

      this.userService.userUpdated.subscribe((user: any)=>{
          let userdUpdated = {...this.user_data,  name: user.name,  last_name :user.last_name, image: user.image};

        this.user_data = userdUpdated;
  
        this.storage.set("user", userdUpdated)
        this.modalController.dismiss();
      });
  }
  
  async takePhoto(source: CameraSource) {
    console.log('Take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async update() {
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }
  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿De dónde desea obtener la imagen?",
      buttons:[
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }

  async updateAccount(){
    const modal = await this.modalController.create({
      component: EditAccountModalPage,
      componentProps:{}
    });
 return await modal.present();
}


}
