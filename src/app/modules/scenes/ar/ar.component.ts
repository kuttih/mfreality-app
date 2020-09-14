import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app.constants';
import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';

// declare var AFRAME:any;
var markerFromAPi:any
@Component({
  selector: 'app-ar',
  templateUrl: './ar.component.html',
  styleUrls: ['./ar.component.css']
})
export class ArComponent implements OnInit {
  
  pattUrl = "marker.patt";
  assetsUrl= "asset.mp4";
  urls
  constructor(
    private dataservice: DataService,
    private sanitizer : DomSanitizer
  ) {

    console.log("Script inside Ar component");

   }

  ngOnInit(): void {
    this.getMarker();
  }

  getMarker(){
    this.dataservice.getHardcodedMarker().subscribe(
      m =>
      {
        var newBlob = new Blob([m],{ type: "application/text" });
        console.log(newBlob)
        this.urls = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(newBlob));
        console.log(this.urls);

      // Solution 2

             
      },      
      error => {
        console.log(error);
      }
    );
    

    
  }
  
}

// AFRAME.registerComponent('videohandler', {

//   init: function () {
//       var marker = this.el;
//       this.vid = document.querySelector("#vid");
//       const scene = document.querySelector('a-scene');
//       this.vid.pause();
//       console.log(scene);
//       console.log(marker)
//       marker.addEventListener('markerFound', function () {
//         console.log('Found')
//           this.toggle = true;
//           this.vid.play();
//       }.bind(this));

//       marker.addEventListener('markerLost', function () {
//         console.log('Lost')
//           this.toggle = false;
//           this.vid.pause();
//       }.bind(this));
//   },
// });

// AFRAME.registerComponent('markers_loading',{
//   init:function(){
//     var sceneEl = document.querySelector('a-scene');
//     var butterfly='https://res.cloudinary.com/mfworkshop/raw/upload/v1594681163/mfworkshop/msql4jyuqsfdwlskv5s3.patt'
//     var arjsmarker = 'https://res.cloudinary.com/mfworkshop/raw/upload/v1594687251/mfworkshop/k2vylguedakz73zrpgnm.patt'
//           var url='https://res.cloudinary.com/mfworkshop/raw/upload/v1594687584/mfworkshop/ryy1l7hrjpityrpp7au2.patt'
//           console.log('ar component!')
//           var urlvideo="https://res.cloudinary.com/mfworkshop/video/upload/v1594677962/mfworkshop/k22xilwbtnmegphgmrid.mp4"
//     // var url="assets/pattern-Individual_Blocks-1.patt";

//       //a-assets
//       var assetsEl = document.createElement('a-assets');
//       var videoEl = document.createElement('video');
//       videoEl.setAttribute('class','videos');
//       videoEl.setAttribute('id','vid');
//       videoEl.setAttribute('src',urlvideo);
//       videoEl.setAttribute('preload','auto');
//       videoEl.setAttribute('response-type','arraybuffer');
//       videoEl.setAttribute('loop','');
//       videoEl.setAttribute('webkit-playsinline','');
//       videoEl.setAttribute('playsinline','');
//       videoEl.setAttribute('autoplay','');
//       videoEl.setAttribute('crossorigin','anonymous');
//       assetsEl.appendChild(videoEl);
//       sceneEl.appendChild(assetsEl);
    
 

//       //a-marker
//       var markerEl = document.createElement('a-marker');
//       markerEl.setAttribute('type','pattern');
//       markerEl.setAttribute('preset','custom');
// 			markerEl.setAttribute('url',url);
//       markerEl.setAttribute('id','markerId');
//       // markerEl.setAttribute('smooth','true');
//       // markerEl.setAttribute('smoothCount','10');
//       // markerEl.setAttribute('smoothTolerance','0.01');
//       // markerEl.setAttribute('smoothThreshold','5');
//       // markerEl.setAttribute('raycaster','objects: .clickable');
//       // markerEl.setAttribute('emitevents','true');
//       // markerEl.setAttribute('cursor','fuse: false; rayOrigin: mouse;');
//       markerEl.setAttribute('videohandler','');
// 			markerEl.setAttribute('registerevents','');
//       sceneEl.appendChild(markerEl);
      
      
//       //Adding Static video to marker
//       //a-video
//       var avideoEl= document.createElement('a-video');
//       avideoEl.setAttribute('src','#vid');
//       // avideoEl.object3D.scale.set(1,1,1);
//       // avideoEl.object3D.position.set(0,0,0);
//       // avideoEl.object3D.rotation.set(-90,0,0);
//       avideoEl.setAttribute('scale','1,1,1');
//       avideoEl.setAttribute('position','0,0,0');
//       avideoEl.setAttribute('rotation','-90,0,0');
//       avideoEl.setAttribute('class','clickable');
//       avideoEl.setAttribute('gesture-handler','');
//       markerEl.appendChild(avideoEl);
//   }
// })

// multiMarkersName.js Solution
//Global Variable
// var markersURLArray=[];
// var markersNameArray=[];

// AFRAME.registerComponent('markers_start',{
// 	init:function(){
// 		console.log('Add markers to the scene');

// 		var sceneEl = document.querySelector('a-scene');
		
// 		//list of the markers
// 		for(var i=1; i<2; i++)
// 		{
// 			var url="assets/resources/markers/pattern-Individual_Blocks-"+i+".patt";
// 			markersURLArray.push(url);
// 			markersNameArray.push('Marker_'+i);
// 			console.log(url);
// 		}

// 		for(var k=0; k<1; k++)
// 		{



//       //Adding assets
//       //a-assets
//       var assetsEl = document.createElement('a-assets');
//       assetsEl.setAttribute('class','videos');
//       assetsEl.setAttribute('id','vid');
//       assetsEl.setAttribute('src','assets/asset.mp4');
//       assetsEl.setAttribute('preload','auto');
//       assetsEl.setAttribute('response-type','arraybuffer');
//       assetsEl.setAttribute('loop','');
//       assetsEl.setAttribute('crossorigin','');
//       assetsEl.setAttribute('webkit-playsinline','');
//       assetsEl.setAttribute('playsinline','');
//       assetsEl.setAttribute('autoplay','');
//       assetsEl.setAttribute('crossorigin','anonymous');
//       sceneEl.appendChild(assetsEl);





//       //a-marker
// 			var markerEl = document.createElement('a-marker');
//       markerEl.setAttribute('type','pattern');
//       markerEl.setAttribute('preset','custom');
// 			markerEl.setAttribute('url',markersURLArray[k]);
//       markerEl.setAttribute('id',markersNameArray[k]);
//       markerEl.setAttribute('smooth','true');
//       markerEl.setAttribute('smoothCount','10');
//       markerEl.setAttribute('smoothTolerance','0.01');
//       markerEl.setAttribute('smoothThreshold','05');
//       markerEl.setAttribute('raycaster','objects: .clickable');
//       markerEl.setAttribute('emitevents','true');
//       markerEl.setAttribute('videohandler','');
// 			markerEl.setAttribute('registerevents','');
//       sceneEl.appendChild(markerEl);
      
// 			//Adding text to each marker
// 			var textEl = document.createElement('a-entity');
// 			textEl.setAttribute('id','text');
// 			textEl.setAttribute('text',{color: 'red', align: 'center', value:markersNameArray[k], width: '5.5'});
// 			textEl.object3D.position.set(0, 0.7, 0);
// 			textEl.object3D.rotation.set(-90, 0, 0);
//       markerEl.appendChild(textEl);
      
//       //Adding Static video to marker
//       //a-video
//       var videoEl= document.createElement('a-video');
//       videoEl.setAttribute('src','#vid');
//       videoEl.object3D.position.set(0,0.1,0);
//       videoEl.object3D.scale.set(1,1,1);
//       videoEl.object3D.rotation.set(90,180,0);
//       videoEl.setAttribute('class','clickable');
//       videoEl.setAttribute('gesture-handler','');
//       markerEl.appendChild(videoEl);




// 		}
// 	}
// });



//Detect marker found and lost
// AFRAME.registerComponent('registerevents', {
// 		init: function () {
// 			const marker = this.el;
//       this.vid = document.querySelector("#vid");
//       const scene = document.querySelector('a-scene');
//       this.vid.pause();
// 			marker.addEventListener("markerFound", ()=> {
// 				var markerId = marker.id;
// 				console.log('Marker Found: ', markerId);
// 			});

// 			marker.addEventListener("markerLost",() =>{
// 				var markerId = marker.id;
// 				console.log('Marker Lost: ', markerId);
// 			});
// 		},
// 	});
