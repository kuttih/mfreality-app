import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import {API_URL} from 'src/app.constants';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { User } from '../addscenes.component';

@Component({
  selector: 'app-triggerimage',
  templateUrl: './triggerimage.component.html',
  styleUrls: ['./triggerimage.component.css']
})
export class TriggerimageComponent implements OnInit {

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName="dino.jpg";
  triggerImage:string;
  sessionImageId:any;
  user:User;
  userId: string;
  selectedFiles;
  markerFile;
  markerUrl;
  requestOptions;
  cloudinaryMarkerResponse;
  constructor(
    private httpClient: HttpClient,
    private dataservice:DataService,
    private tokenStorage:TokenStorageService) {

  }


 async ngOnInit() {
    //Modal is in Addscenes Component
    // document.getElementById("exampleModal").click();
    //Get the info of last uploaded image

    //Inject last uploaded image by user in #triggerImage
    this.triggerImage = this.tokenStorage.getTriggerImage();
    this.sessionImageId = this.tokenStorage.getSessionImageId();
    this.user = this.tokenStorage.getUser();
    this.userId = this.user.id;
   await this.getPromiseImageUrl();

    //onNext click #triggerImage should be saved
    
  }


  getImage() 
  {
    //Make a call to Sprinf Boot to get the Image Bytes.
    
    this.dataservice.getUplodedImage(this.triggerImage)
      .subscribe(
        res => {
          console.log("triggerImage: "+res)
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }


  //Aint working should be by User and ImageID
  // getPromiseImage()
  // {
  //   const promise = new Promise((resolve, reject) => {
  //     this.dataservice.getUploadedImageByUser(this.userId,this.triggerImage)
  //       .toPromise()
  //       .then((res: any) => {
  //         console.log("triggerImage: "+res.id)
  //         this.tokenStorage.saveSessionImageId(res.id)
  //         // Success
  //         this.retrieveResonse = res;
  //         this.base64Data = this.retrieveResonse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //         resolve();
  //       },
  //         err => {
  //           // Error
  //           console.log(err)
  //           reject(err);
  //         }
  //       );
  //   });
  //   return promise;
  // }


    //Working with UserId & ImageID
    getPromiseImageUrl()
    {
      const promise = new Promise((resolve, reject) => {
        this.dataservice.getUploadedImageByUserAndImageId(this.userId,this.sessionImageId)
          .toPromise()
          .then((res: any) => {
            // console.log("triggerImage: "+res.id)
            this.tokenStorage.saveSessionImageId(res.id)
            // Success
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            resolve();
          },
            err => {
              // Error
              console.log(err)
              reject(err);
            }
          );
      });
      return promise;
    }

  //Marker file
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.markerFile = event.target.files[0];
    console.log(this.markerFile);
    console.log(this.markerFile.name);
}


//Upload marker and generate URL
 async onNextClick(){
   //Upload to CDN 
  await this.fetchCloudMarker()
  console.log("Marker URL: "+this.cloudinaryMarkerResponse)
  const uploadMarkerData = new FormData();
  console.log('userId: ' +this.user.id);
  console.log('imageId:' +this.sessionImageId)

  uploadMarkerData.append('markerFile', this.markerFile, this.markerFile.name);
  uploadMarkerData.append('userId', this.user.id);
  uploadMarkerData.append('imageId', this.sessionImageId);
  uploadMarkerData.append('markerUrl', this.cloudinaryMarkerResponse)
  this.dataservice.saveMarkerPatt(uploadMarkerData).subscribe(
    res => {
      console.log("marker saved!")
    },
    error =>{
      console.log(error)
    }
  )

}

async fetchCloudMarker() {
  var formdata = new FormData();
  formdata.append("upload_preset", "tt83ougy");
  formdata.append("file",this.markerFile, this.markerFile.name);

  this.requestOptions = {
    method: 'POST',
    // mode: 'no-cors',
    // headers:{
    //   'Access-Control-Allow-Origin':'*',
    //   'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    // },
    body: formdata,
    redirect: 'follow',
  };

 await  fetch("https://api.cloudinary.com/v1_1/mfworkshop/auto/upload", this.requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.secure_url != '') {
        this.cloudinaryMarkerResponse = data.secure_url;
        console.log('cloudynariResponse from API: '+this.cloudinaryMarkerResponse)
      }
    })
    .catch(error => console.log('error', error));
}
  

  //Image manipulation functions


}
