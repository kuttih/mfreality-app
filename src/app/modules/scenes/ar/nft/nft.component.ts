import { Component, OnInit } from '@angular/core';
declare var AFRAME:any;

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

window.onload = function() {
  AFRAME.registerComponent('videoshandler', {
      init: function () {
          var marker = this.el;

          this.vid = document.querySelector("#vid");
          this.vid.pause();
          marker.addEventListener('markerFound', function () {
              this.vid.play();
          }.bind(this));

marker.addEventListener('markerLost', function() {
this.vid.pause();
this.vid.currentTime = 0;
}.bind(this));
      }
  });
};