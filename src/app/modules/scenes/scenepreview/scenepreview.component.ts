import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { User } from '../addscenes/addscenes.component';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
declare var AFRAME:any;
let dynamicVideoUrl=''
let dynamicPatternUrl=''
@Component({
  selector: 'app-scenepreview',
  templateUrl: './scenepreview.component.html',
  styleUrls: ['./scenepreview.component.css']
})
export class ScenepreviewComponent {
  sceneId:number;
  user: User;
  userId: string;
  sceneInfo:any;
  videoUrl:string;
  patturl:string
  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private ds : DataService,
    private tokenStorage: TokenStorageService
  ) { }

  async ngOnInit() {
    this.sceneId=this.route.snapshot.params['id'];
    this.user = this.tokenStorage.getUser();
    this.userId = this.user.id;
    if(this.sceneId){
      console.log('result of scene params here:'+this.sceneId);
      //getSceneInfo
     await this.ds.getSceneInfo(this.userId,this.sceneId).subscribe(
       res => {
         console.log(res)
         this.sceneInfo = res
         this.videoUrl = this.sceneInfo[0][6]
         console.log("dynamic Url:" +this.videoUrl)
         dynamicVideoUrl  = this.videoUrl
         console.log("global var:" +dynamicVideoUrl)
         this.patturl = this.sceneInfo[0][7]
         dynamicPatternUrl = this.patturl
         console.log("dynamic patt URL:" +dynamicPatternUrl)
        this.tokenStorage.saveSessionPatternUrl(this.patturl)
        this.tokenStorage.saveSessionVideoUrl(this.videoUrl)
         
       },
       error =>  {
        console.log(error)
       } 
     )

    }
  }


}


AFRAME.registerComponent('videohandler_scene_preview', {

  init: function () {
      var marker = this.el;
      this.vid = document.querySelector("#vid");
      const scene = document.querySelector('a-scene');
      this.vid.pause();
      console.log(scene);
      console.log(marker)
      marker.addEventListener('markerFound', function () {
        console.log('Found')
          this.toggle = true;
          this.vid.play();
      }.bind(this));

      marker.addEventListener('markerLost', function () {
        console.log('Lost')
          this.toggle = false;
          this.vid.pause();
      }.bind(this));
  },
});

AFRAME.registerComponent('markers_loading_scene_preview',{
  init:function(){
          var sceneEl = document.querySelector('a-scene');
          // var url=  dynamicPatternUrl
          // console.log("patt url:" +dynamicPatternUrl)
          // var urlvideo= dynamicVideoUrl
          // console.log("video url:" +dynamicVideoUrl)
         var urlvideo = window.sessionStorage.getItem('video_url')
          var url = window.sessionStorage.getItem('pattern_url')

          console.log('variable from session:' +urlvideo+" : "+url)

    // var url="assets/pattern-Individual_Blocks-1.patt";

      //a-assets
      var assetsEl = document.createElement('a-assets');
      var videoEl = document.createElement('video');
      videoEl.setAttribute('class','videos');
      videoEl.setAttribute('id','vid');
      videoEl.setAttribute('src',urlvideo);
      videoEl.setAttribute('preload','auto');
      videoEl.setAttribute('response-type','arraybuffer');
      videoEl.setAttribute('loop','');
      videoEl.setAttribute('webkit-playsinline','');
      videoEl.setAttribute('playsinline','');
      videoEl.setAttribute('autoplay','');
      videoEl.setAttribute('crossorigin','anonymous');
      assetsEl.appendChild(videoEl);
      sceneEl.appendChild(assetsEl);
    
 

      //a-marker
      var markerEl = document.createElement('a-marker');
      markerEl.setAttribute('type','pattern');
      markerEl.setAttribute('preset','custom');
			markerEl.setAttribute('url',url);
      markerEl.setAttribute('id','scene_preview_markerId');
      markerEl.setAttribute('smooth','true');
      markerEl.setAttribute('smoothCount','10');
      markerEl.setAttribute('smoothTolerance','0.01');
      markerEl.setAttribute('smoothThreshold','5');
      markerEl.setAttribute('raycaster','objects: .clickable');
      markerEl.setAttribute('emitevents','true');
      markerEl.setAttribute('cursor','fuse: false; rayOrigin: mouse;');
      markerEl.setAttribute('videohandler_scene_preview','');
			markerEl.setAttribute('registerevents_scene_preview','');
      sceneEl.appendChild(markerEl);
      
      
      //Adding Static video to marker
      //a-video
      var avideoEl= document.createElement('a-video');
      avideoEl.setAttribute('src','#vid');
      avideoEl.setAttribute('scale','1,1,1');
      avideoEl.setAttribute('position','0,0,0');
      avideoEl.setAttribute('rotation','-90,0,0');
      avideoEl.setAttribute('class','clickable');
      avideoEl.setAttribute('gesture-handler','');
      markerEl.appendChild(avideoEl);
  }
})





//Detect marker found and lost
AFRAME.registerComponent('registerevents_scene_preview', {
		init: function () {
			const marker = this.el;
      this.vid = document.querySelector("#vid");
      const scene = document.querySelector('a-scene');
      this.vid.pause();
			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
				console.log('Marker Found: ', markerId);
			});

			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('Marker Lost: ', markerId);
			});
		},
	});

