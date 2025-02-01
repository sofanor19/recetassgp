import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-edit-account-modal',
  templateUrl: './edit-account-modal.page.html',
  styleUrls: ['./edit-account-modal.page.scss'],
  standalone: false
})
export class EditAccountModalPage implements OnInit {

  updateAccountForm: FormGroup;
  errorMessage: any;
  user_data: any = {
    name: '',
    email: '',
    image: '',
    followees: [],
    followers: []
  };
  formErrors = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' }
    ],
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Name must be at least 6 characters long.' }
    ],
    lastname: [
      { type: 'required', message: 'Lastname is required' },
      { type: 'minlength', message: 'Lastname must be at least 6 characters long.' }
    ]
  };


  constructor(
     private formBuilder: FormBuilder,
     private userService: UserService,
     public alertController: AlertController,
     private storage: Storage,
     private modalController: ModalController
   ) { 

    
     this.updateAccountForm = this.formBuilder.group({
             email: new FormControl(''),
             name: new FormControl('', Validators.compose([
               Validators.required,
               Validators.minLength(4)
             ])),
             lastname: new FormControl('', Validators.compose([
               Validators.required,
               Validators.minLength(4)
             ]))
          
           });
     
   }

  async ngOnInit() {

    let user: any = await this.storage.get("user");

    this.user_data = user;

    this.updateUserView(user)

   
  }

  private updateUserView(user:any){
    this.updateAccountForm.get('email')?.disable();
    this.updateAccountForm.get("email")?.setValue(user.email);
    this.updateAccountForm.get("name")?.setValue(user.name);
    this.updateAccountForm.get("lastname")?.setValue(user.last_name);
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


  async takePhoto(source: CameraSource) {
    console.log('Take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
  
  }
  
  async update() {
 
    
      
  }


  async updateAccount(){
        const modal = await this.modalController.create({
          component: EditAccountModalPage,
          componentProps:{}
        });
     return await modal.present();
  }


  updateUser(registerData: any) {

    this.user_data.name = registerData.name;
    this.user_data.last_name = registerData.lastname;
  
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }

  cancel(){
    this.modalController.dismiss()
  }


}
