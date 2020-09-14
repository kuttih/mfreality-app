import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app.constants';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Scene } from '../../../scenes/scenes.component';
import { User } from '../addscenes.component';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';



@Component({
  selector: 'app-scenecompleted',
  templateUrl: './scenecompleted.component.html',
  styleUrls: ['./scenecompleted.component.css']
})
export class ScenecompletedComponent implements OnInit {

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  fileToUpload: File = null;
  message: string = "";
  imageName = "dino.jpg";
  sceneName: string;
  tags: string;
  scene: Scene;
  creationDate: Date;
  retrieveResponse: any;
  triggerImage: string;
  imageId: number;
  userId: string;
  overlays: any;
  sessionImageId: any;
  user: User;
  overlaysList: any;
  eachOverlay: {
    image_id: number,
    video_id: number,
    video_path: string
  }
  lisftofOverlays = new Array()
  stringOfOverlays: string;
  uploader:boolean = false;

  constructor(private httpClient: HttpClient,
    private dataservice: DataService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

  async ngOnInit() {
    this.triggerImage = this.tokenStorage.getTriggerImage();
    this.sessionImageId = this.tokenStorage.getSessionImageId();
    this.user = this.tokenStorage.getUser();
    this.userId = this.user.id;
    this.getUserPromiseImage();
    this.sessionImageId = this.tokenStorage.getSessionImageId()
    await this.getUploadedOverlays(this.sessionImageId);
    // this.overlaysList = this.dataservice.getUploadedOverlaysByUser(1,16);
    // console.log(this.overlaysList);
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
          console.log("triggerImage: " + this.retrieveResponse.id)
          console.log("imageId: " + this.imageId)


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

  getUploadedOverlays(sessionImageId) {
    this.dataservice.getUploadedOverlaysByUser(this.userId, sessionImageId).subscribe(
      res => {
        this.overlays = res
        console.log("Scene Completed: overlays -> ")
        console.log(res)
      },
      error => {
        console.log(error);
      }
    );

  }

  //return a Json {"video_id":"video_path"}


  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get(API_URL + 'image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }


  async saveScene() {
    this.uploader = true;
    console.log(this.sceneName + " tags: " + this.tags);
    //Call /scene/add 
    //Redirect to addScene component
    //ngOnInit() call /scene/get/all test result and render scenes or Create new Scene
    //get Scene Information: Title, HashTages, TriggerImage, Overlays, UserID,
    this.overlaysList = await this.dataservice.getUploadedOverlaysByUser(this.userId, this.imageId).subscribe
      (
        res => {
          this.overlays = res
          console.log(res)
          for (let index = 0; index < this.overlays.length; index++) {
            const element = this.overlays[index];
            this.eachOverlay =
            {
              "image_id": this.overlays[index].image_id,
              "video_id": this.overlays[index].id,
              "video_path": this.overlays[index].video_path
            }
            console.log(this.eachOverlay)
            this.lisftofOverlays.push(this.eachOverlay)

          }
          console.log(JSON.stringify(this.lisftofOverlays))
        }

      )
    this.stringOfOverlays = JSON.stringify(this.lisftofOverlays)

    console.log("Anoher string of overlays" + this.stringOfOverlays)

    this.creationDate = new Date();
    this.scene = new Scene(1,
      this.sceneName,
      this.tags,
      this.imageId,
      this.userId,
      this.triggerImage,
      this.stringOfOverlays,
      this.creationDate
    );

    console.log(this.scene.name + " " + this.scene.tags + " " + this.scene.imageId + " user ID "
      + this.scene.userId + " " + this.scene.imageName + " " + this.scene.overlays + " " + this.creationDate + "")
    this.dataservice.addScene(this.scene).subscribe(
      data => {
        // console.log("Returned Data addScene() " + data)
        // window.alert("Scene Uploaded (Dialog Box)")
        //ifeveyrthing went well redirect to scenes -> 
        this.uploader = false;
        this.router.navigate(['addscene'])

      }
    );

    console.log("end of saveScene")

  }

  public getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

}
