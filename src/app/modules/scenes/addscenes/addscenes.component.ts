import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { API_URL } from 'src/app.constants';
import { TokenStorageService } from '../../../services/auth/token-storage.service'
import { Router } from '@angular/router';




@Component({
  selector: 'app-addscenes',
  templateUrl: './addscenes.component.html',
  styleUrls: ['./addscenes.component.css']
})
export class AddscenesComponent implements OnInit {

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = "Initialized";
  Hellomessage: string;
  userId: number;
  imageName: any;
  description: any;
  triggerImage: string;
  user: User;
  cloudinaryResponse;
  requestOptions;
  url: string;
  imagePath: string;
  imgURL: any;
  msg: string;
  uploader:boolean = false;

  constructor(
    private httpClient: HttpClient,
    private dataservice: DataService,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.tokenStorage.clearTriggerImage();
    this.user = this.tokenStorage.getUser();
  }

  onAdd(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }



  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.tokenStorage.saveTriggerImage(this.selectedFile.name)

  }

  //Gets called when the user clicks on submit to upload the image Without ImageID Error with same Image Name
  // async onUpload() {
  //   document.getElementById("exampleModal").click();
  //   await this.fetchImageCloud()
  //   //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  //   uploadImageData.append('userId', this.user.id);
  //   uploadImageData.append('imanename', this.imageName);
  //   uploadImageData.append('description', this.description);
  //   uploadImageData.append('imageurl', this.cloudinaryResponse);
  //   //Make a call to the Spring Boot Application to save the image
  //   //function should call a service to execute this call
  //   this.dataservice.triggerImageUpload(uploadImageData).subscribe(

  //     response => {
  //       if (response) {
  //         console.log(response)
  //         this.message = 'Image uploaded successfully';
  //         this.router.navigate(['uploadimage'])

  //       } else {
  //         this.message = 'Image not uploaded successfully';
  //       }
  //     },
  //     error => {
  //       this.message = error.message;
  //     });
  // }

  async onUpload() {
    this.uploader = true;
    document.getElementById("exampleModal").click();
    await this.fetchImageCloud()
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('userId', this.user.id);
    uploadImageData.append('imanename', this.imageName);
    uploadImageData.append('description', this.description);
    uploadImageData.append('imageurl', this.cloudinaryResponse);
    //Make a call to the Spring Boot Application to save the image
    //function should call a service to execute this call
    this.dataservice.saveImage(uploadImageData).subscribe(

      response => {
        if (response) {
          this.uploader = false;
          console.log(response)
          console.log('Image ID response upon upload:' +response.id)
          this.message = 'Image uploaded successfully';
          this.tokenStorage.saveSessionImageId(response.id)
          this.tokenStorage.saveSessionImageUrl(response.imageUrl )
          this.router.navigate(['uploadimage'])

        } else {
          this.message = 'Image not uploaded successfully';
        }
      },
      error => {
        this.message = error.message;
      });
  }

  async fetchImageCloud() {
    var formdata = new FormData();
    formdata.append("upload_preset", "tt83ougy");
    formdata.append("file", this.selectedFile, this.selectedFile.name);

    this.requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    await fetch("https://api.cloudinary.com/v1_1/mfworkshop/image/upload", this.requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.secure_url != '') {
          this.cloudinaryResponse = data.secure_url;
          console.log('cloudynariResponse Image from API: ' + this.cloudinaryResponse)
        }
      })
      .catch(error => console.log('error', error));
  }





  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.triggerImage = this.tokenStorage.getTriggerImage();
    this.httpClient.get(API_URL + 'image/get/' + this.triggerImage)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  public handleSuccessfulResponse(response) {
    console.log("response");
    console.log(response);
    this.Hellomessage = response.message

  }

  public handleErrorResponse(error) {
    console.log("response");

    this.Hellomessage = error.error.message
  }


}


export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public roles: string[],
    public tokenType: string,
    public accessToken: string,
  ) {

  }
}