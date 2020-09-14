import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Observable } from 'rxjs';
import { User } from './addscenes/addscenes.component';
import { map, data } from 'jquery';
import { ArComponent } from '../scenes/ar/ar.component';
import { DomSanitizer } from '@angular/platform-browser';
import { isEmpty } from 'rxjs/operators';



@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.css']
})




//LazyLoading if there is Scenes! 
export class ScenesComponent implements OnInit {

  message: string;
  sceneList: Scene[];
  sceneList$: Observable<Scene[]>;
  //Defined by reverse
  areScenesAvailable: boolean = true;
  user: User;
  userId: string;
  overlaysList: any;
  eachOverlay: {
    image_id: number,
    video_id: number,
    video_path: string
  }
  lisftofOverlays = new Array()
  overlays: any
  data: []
  //list of overlays
  videoSrc;
  sceneModalId: number;
  sceneTriggerImageLink: string;
  retrievedImage: any;
  urlbase: string;
  videoUrl: string;
  sceneInfo: any;
  dynamicVideoUrl: string;
  sceneDataFill: Urlvideo[]
  sceneInfoObject: Urlvideo;
  sceneListData: any;

  constructor(private httpClient: HttpClient,
    private dataservice: DataService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private sanitizer: DomSanitizer) {


  }

  user1 = this.tokenStorage.getUser();
  userId1 = this.user1.id;

  async ngOnInit() {
    this.tokenStorage.clearTriggerImage();
    this.tokenStorage.clearSessionImageId();

    console.log("uid: " + this.userId1)

    //  await this.getAllUserScenes(this.user1.id)
    await this.getAllUserScenesParams(this.user1.id)
    //Just for test Overlay JsonList object can be removed
    //  this.overlaysList =  this.dataservice.getUploadedOverlaysByUser(1, 28).subscribe(
    //     res => {
    //       this.overlays = res
    //       for (let index = 0; index < this.overlays.length; index++) {
    //         const element = this.overlays[index];
    //         this.eachOverlay =
    //         {
    //           "image_id":this.overlays[index].image_id,
    //           "video_id":this.overlays[index].id,
    //           "video_path":this.overlays[index].video_path
    //         }
    //         this.lisftofOverlays.push(this.eachOverlay)

    //       }
    //         console.log(JSON.stringify(this.lisftofOverlays))
    //     }

    //  )
    // For Camera Problem
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }

  }

  getScenes() {
    this.dataservice.getAllScenes().subscribe(
      response => {
        console.log(response);
        this.sceneList = response;
      }
    )
  }

  //GetAllUserScenes -> Image, Marker, Overlays of each scene 
  async getAllUserScenes(userId) {
    this.dataservice.geAllUserScenes(userId).subscribe(
      async response => {
        //List of scenes
        if (response.length > 0) {
          console.log("Scenes are available!")
          console.log(response)
          response.forEach(scene => {

            this.getSceneInfo(userId, scene.id)
            // this.sceneInfoObject.imageurl = this.urlbase
            // this.sceneInfoObject.videourl = this.dynamicVideoUrl
            // this.sceneDataFill.push(this.sceneInfoObject)    
          })
          this.areScenesAvailable = false;
        }
        this.sceneList = response;

      }
    );
  }


  async getAllUserScenesParams(userId) {
    console.log('getAllUserScenesParams ->')
    this.dataservice.getAllUserScenesWithData(userId).subscribe(
      response => {
        console.log("Scenes are available!")
        console.log(response)
        this.sceneListData = response;
        if (this.sceneListData.length > 0) {
          this.areScenesAvailable = false;

        }

      })

  }




  getSceneImage(userId, imageId) {

  }

  getSceneOverlays(userId, imageId) {

  }

  async getSceneInfo(user_id, scene_id) {
    console.log('getSceneInfo' + user_id + 'and ' + scene_id)
    await this.dataservice.getSceneInfo(user_id, scene_id).subscribe(
      res => {
        console.log(res)
        this.sceneInfo = res
        this.urlbase = this.sceneInfo[0][5]
        console.log('urlbase:' + this.urlbase)
        this.retrievedImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlbase)
        console.log('image:' + this.retrievedImage)
        this.videoUrl = this.sceneInfo[0][6]
        console.log("dynamic Url:" + this.videoUrl)
        this.dynamicVideoUrl = this.videoUrl
      },
      error => {
        console.log(error)
      }
    )
  }


  previewScene(id) {
    console.log('Preview Scene by ID:' + id)
    this.router.navigate(['scenepreview', id])

  }

  deleteScene(id, sceneName) {
    if (confirm("Are you sure you want to delete "+sceneName+ " Scene! ")) {

      this.dataservice.deleteScene(id).subscribe(

        response => {
          if (response) {
            window.alert("Scene Deleted")
          }
        },
        error => {
          console.log(error)
        }
      );
      console.log("scene ID" + id)
      window.location.reload();
    }
  }
  saveSceneId(id) {
    this.sceneModalId = id
  }

  saveSceneIdAndTriggerImage(id, triggerLink) {
    this.sceneModalId = id;
    this.sceneTriggerImageLink = triggerLink;
    console.log(this.sceneTriggerImageLink)
  }

}

export class Scene {
  constructor(
    public id: number,
    public name: string,
    public tags: string,
    public imageId: number,
    public userId: string,
    public imageName: string,
    public overlays: any,
    public creationDate: Date
  ) {

  }

}

export class Image {
  constructor(
    public id: number,
    public user_id: number,
    public image_name: string,
    public description: string,
    public type: string,
    public file_name: string,
    public picByte: string,
    public imageUrl: string,
    public creationDate: Date) {

  }
}

export interface Urlvideo {
  imageurl: string;
  videourl: string;
}

export class UrlVideoData implements Urlvideo {
  imageurl: string;
  videourl: string;
  constructor() { }
}




