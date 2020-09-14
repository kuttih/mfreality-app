import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app.constants';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { User } from '../addscenes.component';




@Component({
  selector: 'app-generatedimage',
  templateUrl: './generatedimage.component.html',
  styleUrls: ['./generatedimage.component.css']
})
export class GeneratedimageComponent implements OnInit {
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  fileToUpload: File = null;
  message: string = "";
  triggerImage: string;
  userId: string;
  videoName;
  description:any;
  user: User;
  imageId: string;
  video_url: any
  cloudinaryResponse: any;
  fetchCloudRespone: any;
  requestOptions;
  sessionImageId;
  //Change to dynamic ->Session storage 
  imageName = "dino.jpg";
  uploader:boolean = false;
  constructor(
    private httpClient: HttpClient,
    private dataservice: DataService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

  async ngOnInit() {

    this.triggerImage = this.tokenStorage.getTriggerImage();
    this.sessionImageId = this.tokenStorage.getSessionImageId();
    this.user = this.tokenStorage.getUser();
    this.userId = this.user.id;
    console.log("Trigger Image on init: " + this.triggerImage)
    // await this.getUserImage();
    await this.getUserImageById();
  }

  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.

    this.httpClient.get(API_URL + 'image/get/' + this.triggerImage)
      .subscribe(
        res => {
          this.retrieveResponse = res;
          console.log("Image ID" + this.retrieveResponse.id)
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
        //Save it to localStorave or Session for future use
      },
      error => {
        console.log(error);
      }
    );
  }

  async getUserImageById() {
    await this.dataservice.getUploadedImageByUserAndImageId(this.userId, this.sessionImageId).subscribe(
      res => {
        this.retrieveResponse = res;
        this.base64Data = this.retrieveResponse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.imageId = this.retrieveResponse.id;
        //Save it to localStorave or Session for future use
      },
      error => {
        console.log(error);
      }
    );
  }

  handleVideoFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log("name " + this.fileToUpload.name)
    console.log("type: " + this.fileToUpload.type)
    console.log("size: " + this.fileToUpload.size)
    // Size Validation should be < 200MB
  }

  //Upload video
  //Redirect to the same page if user wants to add another overlay
  //Get uploaded overlays and show them
  //Video Upload Progress
  uploadVideoFileToActivity() {
    document.getElementById("exampleModal").click();
    const uploadFileData = new FormData();
    uploadFileData.append('videoFile', this.fileToUpload, this.fileToUpload.name);
    uploadFileData.append('userId', this.user.id);
    uploadFileData.append('imageId', this.imageId);
    uploadFileData.append('videoName', this.videoName);//Video Name is undefined
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
            console.log(response)
            this.uploader=false;
            this.message = 'Video uploaded successfully';
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
          console.log('cloudynariResponse from API:' + this.cloudinaryResponse)
        }
      })
      .catch(error => console.log('error', error));
  }



}
