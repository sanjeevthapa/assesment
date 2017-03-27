import { Component } from '@angular/core';
//create and validate the forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController,ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'page-input',
  templateUrl: 'input.html'
})
/*
class Input
do operations like opening camera
file transfer and so more
 */
export class Input {
  public InputForm : any;

  lastImage: string = null;
  loading: Loading;

  constructor(public FormBuilder: FormBuilder,public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    //instantiate a inputform
    this.InputForm  = this.FormBuilder.group({
      "description":["",Validators.required],
    });
  }

  //ask user an option to chooose from both library or camera
  public uploadPicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
/*====================================================================================*/
/*====================================================================================*/
/*====================================================================================*/
public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
/*====================================================================================*/
/*====================================================================================*/
/*====================================================================================*/
  // Get the data of an image
  Camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      FilePath.resolveNativePath(imagePath)
      .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}

// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
    console.log("FILE COPY SUCCESS LOCAL NOW UPLOAD");
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

//display a toast on screen
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

/*
  Upload image is not working in the simulator, works on the real device and hosted on a infrastructure
 */
public uploadImage() {
  // Destination URL
  var url = "http://clients.cloudyfox.com/blog/public/photos";

  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
  // File name only
  var filename = this.lastImage;
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    params : {'fileName': filename,'description':this.InputForm.value.description,'userid':1}
  };

  const fileTransfer = new Transfer();

  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();

  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
  return false;
}


}
