import { Component, OnInit, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app.constants';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { User } from '../addscenes.component';
import { Observable, of } from 'rxjs';
import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from '../../../../../app.constants';


@Component({
  selector: 'app-overlays',
  templateUrl: './overlays.component.html',
  styleUrls: ['./overlays.component.css'],

})
export class OverlaysComponent implements OnInit {

  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  fileToUpload: File = null;
  message: string;
  triggerImage: string;
  user: User;
  imageId: string;
  userId: string;
  overlays: any;
  sessionImageId: any;
  videoName;
  description:any;
  videobase64Data;
  videoSource;
  video_url: any
  cloudinaryResponse: any;
  fetchCloudRespone: any;
  requestOptions;
  uploader:boolean = false;

  constructor(
    private httpClient: HttpClient,
    private dataservice: DataService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private cloudinary: Cloudinary) {

    console.log(cloudinary.cloudinaryInstance.image('sample'));


  }

  async ngOnInit() {

    this.triggerImage = this.tokenStorage.getTriggerImage();
    this.sessionImageId = this.tokenStorage.getSessionImageId();
    this.user = this.tokenStorage.getUser();
    this.userId = this.user.id;
    // this.getUserImage();
    this.getUserPromiseImage();
    this.sessionImageId = this.tokenStorage.getSessionImageId()
    await this.getUploadedOverlays(this.sessionImageId);


  }



  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get(API_URL + 'image/get/' + this.triggerImage)
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  async getUserImage() {
    await this.dataservice.getUploadedImageByUser(this.userId, this.triggerImage).subscribe(
      res => {
        this.retrieveResponse = res;
        this.base64Data = this.retrieveResponse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.imageId = this.retrieveResponse.id;
        console.log("getUserImage() image Id" + this.imageId)
      },
      error => {
        console.log(error);
      }

    );
  }

  async getUserPromiseImage() {
    const promise = new Promise((resolve, reject) => {
      this.dataservice.getUploadedImageByUserAndImageId(this.userId, this.sessionImageId)
        .toPromise()
        .then((res: any) => {
          // Success
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          this.imageId = this.retrieveResponse.id;
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

  async getUploadedOverlays(sessionImageId) {
    await this.dataservice.getUploadedOverlaysByUser(this.userId, sessionImageId).subscribe(
      res => {
        this.overlays = res
        this.videobase64Data = this.overlays.videoByte;
        console.log("Overlays: ")
        console.log(res)
      },
      error => {
        console.log(error);
      }
    );

  }

  confirmArCreation() {
    console.log("Last Next confirming the Ar creation");
    window.alert("Last Next do you confirm?");
    //Router navigate /savescene
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log("the file" + this.fileToUpload.name)
  }

  uploadFileToActivity() {
    document.getElementById("exampleModal").click();
    //post video in backend
    // Return number of overlays
    // this.getUploadedOverlays(this.sessionImageId);//<- Global var
    // this.router.navigate(['overlays'])
    document.getElementById("exampleModal").click();

    const uploadFileData = new FormData();
    uploadFileData.append('videoFile', this.fileToUpload, this.fileToUpload.name);
    uploadFileData.append('userId', this.user.id);
    uploadFileData.append('imageId', this.imageId);
    uploadFileData.append('videoName', this.videoName);
    uploadFileData.append('description', this.description);
    this.dataservice.uploadVideoOverlay(uploadFileData)
      .subscribe(
        response => {
          if (response) {
            console.log(response)
            this.message = 'Video uploaded successfully';
            //Show overlay 1 
            //Show overlay 2 
            //show overlay 3
            this.router.navigate(['overlays'])
          } else {
            this.message = 'Video not uploaded successfully';
          }
        },
        error => {
          this.message = error.message;
        }
      );
  }

  //To Cloud and DB Path info
  async uploadFileToCoundinary() {
    this.uploader=true;
    document.getElementById("exampleModal").click();
    console.log("res before fetchCloud() call: " + this.cloudinaryResponse)
    await this.fetchCloud();
    console.log("res after fetchCloud() call: " + this.cloudinaryResponse)
    //Information to DB
    const uploadFileData = new FormData();
    uploadFileData.append('videoFile', this.fileToUpload, this.fileToUpload.name);
    uploadFileData.append('userId', this.user.id);
    uploadFileData.append('imageId', this.imageId);
    uploadFileData.append('videoName', this.videoName);
    uploadFileData.append('description', this.description);
    uploadFileData.append('videourl', this.cloudinaryResponse);

    this.dataservice.uploadVideoOverlay(uploadFileData)
      .subscribe(
        response => {
          if (response) {
            this.uploader=false;
            console.log(response)
            this.message = 'Video uploaded successfully';
            //Show overlay 1 
            //Show overlay 2 
            //show overlay 3
            this.router.navigate(['overlays'])
            window.location.reload();

          } else {
            this.message = 'Video not uploaded successfully';
          }
        },
        error => {
          this.message = error.message;
        }
      );
  }

  async fetchCloud() {
    var formdata = new FormData();
    formdata.append("upload_preset", "tt83ougy");
    formdata.append("file", this.fileToUpload, this.fileToUpload.name);

    this.requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    await fetch("https://api.cloudinary.com/v1_1/mfworkshop/video/upload", this.requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.secure_url != '') {
          this.cloudinaryResponse = data.secure_url;
          console.log('cloudynariResponse from API' + this.cloudinaryResponse)
        }
      })
      .catch(error => console.log('error', error));
  }
}


export class Overlays {
  constructor(
    public id: number,
    public image_id: number,
    public user_id: number,
    public name: string,
    public type: string,
    public video_name: string,
    public video_path: string,
    public videoByte: string

  ) {

  }
}



