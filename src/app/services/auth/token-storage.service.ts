import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_TRIGGER_IMAGE =  'trigger_image';
const USER_TRIGGER_IMAGE_ID = 'sessionImageId';
const SCENE_PATTERN_URL = 'pattern_url';
const SCENE_VIDEO_URL = 'video_url'
const USER_TRIGGER_IMAGE_URL = 'image_url';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public saveTriggerImage(trigger_image:string){
    window.sessionStorage.setItem(USER_TRIGGER_IMAGE,trigger_image);
  }

  clearTriggerImage(){
    window.sessionStorage.removeItem(USER_TRIGGER_IMAGE);

  }
  getTriggerImage(){
    return window.sessionStorage.getItem(USER_TRIGGER_IMAGE)
  }

  saveSessionImageId(sessionImageId){
window.sessionStorage.setItem(USER_TRIGGER_IMAGE_ID,sessionImageId)
  }

  getSessionImageId(){
return window.sessionStorage.getItem(USER_TRIGGER_IMAGE_ID)
  }

  saveSessionImageUrl(sessionImageUrl){
    window.sessionStorage.setItem(USER_TRIGGER_IMAGE_URL,sessionImageUrl)

  }

  getSessionImageUrl(){
    return window.sessionStorage.getItem(USER_TRIGGER_IMAGE_URL)

  }

  clearSessionImageId(){
    window.sessionStorage.removeItem(USER_TRIGGER_IMAGE_ID);

  }

  saveSessionPatternUrl(patternUrl){
    window.sessionStorage.setItem(SCENE_PATTERN_URL,patternUrl)
  }
  getSessionPatternUrl(){
    window.sessionStorage.getItem(SCENE_PATTERN_URL);
  }

  saveSessionVideoUrl(videoUrl){
    window.sessionStorage.setItem(SCENE_VIDEO_URL,videoUrl)
  }
  getSessionVideoUrl(){
    window.sessionStorage.getItem(SCENE_VIDEO_URL);
  }
}
