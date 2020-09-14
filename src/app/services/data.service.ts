import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Scene, Image } from '../modules/scenes/scenes.component';
import {CLOUDINARY_URL,CLOUDINARY_UPLOAD_PRESET} from '../../app.constants';



export class HelloWorldBean {
  constructor(public message:string){ }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpCloudOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    'X-Requested-With': 'XMLHttpRequest',
    'authorization':'false'
           })

}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient:HttpClient,
    ) { }

  executeHelloService() {
    console.log("Executing the service");
    return this.httpClient.get<HelloWorldBean>(`${API_URL}/image/helloworld`);
    
  }

  //Scene DATA
  // Get All Scenes by User
  getAllScenes(){
    return this.httpClient.get<Scene[]>(`${API_URL}scene/get/all`);
  }

  geAllUserScenes(userId){
    return this.httpClient.get<Scene[]>(`${API_URL}scene/get/`+userId+`/all`);
  }
  //getSceneWithDynamicData
  getAllUserScenesWithData(userId){
    return this.httpClient.get(`${API_URL}scene/get/`+userId+`/allscenes`);
  }

  getSceneInfo(userId,sceneId){
    return this.httpClient.get(`${API_URL}scene/get/`+userId+`/`+sceneId+`/data`);
  }

  addScene(scene){
    return this.httpClient.post<Scene>(API_URL + 'scene/add',scene,httpOptions)
  }

  deleteScene(id){
    return this.httpClient.delete(API_URL + 'scene/deletescene/'+id)
  }
  
  editScene(id){

  }

  //Image DATA
  triggerImageUpload(uploadImageData)
  {
   return this.httpClient.post(API_URL + 'image/postImage', uploadImageData,{responseType: 'text'})
    
  }

  saveImage(uploadImageData){
    return this.httpClient.post<Image>(API_URL + 'image/save', uploadImageData)

  }

  // Get UploadedImage by Connected User
  getUploadedImageByUser(userId:any,imageName:string){
    return this.httpClient.get(API_URL + 'image/get/'+userId+'/'+imageName)
  }
  // Get UploadedImage by Connected User
  getUploadedImageByUserAndImageId(userId:any,imageId:any){
    return this.httpClient.get(API_URL + 'image/get/'+userId+'/'+imageId)
  }


  getUplodedImage(triggerImage){
  return this.httpClient.get(API_URL+'image/get/' + triggerImage);
  }

  //deleteImage By User
  deleteUplodedImage(){

  }

  editUplodedImage(){

  }


  //Video DATA
  uploadVideoOverlay(uploadOverlayVideoFileData){
    return this.httpClient.post(API_URL + 'video/postVideo', uploadOverlayVideoFileData, { responseType: 'text' })
  }
  //Save video to DB
  // uploadVideoOverlay(uploadOverlayVideoFileData){
  //   return this.httpClient.post(API_URL + 'video/save', uploadOverlayVideoFileData, { responseType: 'text' })
  // }

  uploadOverlayToCloud(file: any,filetoUpload:any):Observable<any> {
    console.log(file);
    let formData = new FormData();
    formData.append('file', file,filetoUpload);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    console.log("upload overlay: in progress:");
    return this.httpClient.post<any>(CLOUDINARY_URL, formData,httpCloudOptions);
  }

  

  //Overlays
  //Will need UserID, ImageId -> Return list of uploaded overlays associated to an Image/Pattern
  getUploadedOverlaysByUser(userId,imageId){
  return this.httpClient.get(API_URL+'video/overlays/'+userId+'/'+imageId)
  }

  //Markers
  getHardcodedMarker(): Observable<Blob>{
    return this.httpClient.get(API_URL + 'marker/get-file',{ responseType: 'blob' });
  }

  saveMarkerPatt(markerfile){
    return this.httpClient.post(API_URL +'marker/save',markerfile,{responseType:'text'})
  }

  
  // postFile(fileToUpload: File): Observable<boolean> 
  // {
  //   const endpoint = 'your-destination-url';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: yourHeadersConfig })
  //     .map(() => { return true; })
  //     .catch((e) => this.handleError(e));
  // }


}
