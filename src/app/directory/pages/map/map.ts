import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';

declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage /*implements OnInit*/ {

  @ViewChild('map') mapElement: ElementRef;
  @Input() mapData;
  map: any;
  latLngOrigin: number;
  latLngDestination:number;
  defaultLatLng: {lat:number, lng:number} = {lat:46.189768, lng:6.148815};
  defaultOriginLatLng: {lat:number, lng:number} = {lat:46.186124299999996, lng:6.134409799999999};

  constructor(public modalCtrl: ModalController) {
    
  }

  // problem avec ionviewDidLoaded
  /*ngOnInit (){
    this.latLngDestination = new google.maps.LatLng(this.defaultLatLng.lat, this.defaultLatLng.lng);

    /*if (this.mapData) {
      this.latLngDestination = new google.maps.LatLng(this.mapData.lat, this.mapData.lng);
    }*/
    //this.latLngOrigin = new google.maps.LatLng(446.186124299999996, 6.134409799999999); // geocoder a recup
    
    //this.loadMap();   
    //this.setMarker();
    //console.log("MAPTS",this.mapData);
  //}

  
  
  loadMap(){
    this.latLngOrigin = new google.maps.LatLng(46.186124299999996, 6.134409799999999);
    console.log("loSD",this.latLngOrigin)
    let mapOptions = {
      center: this.latLngOrigin,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      /*new google.maps.event.addListenerOnce(this.map, 'idle', () => {
      new google.maps.event.trigger(this.map, 'resize');
      //this.map.setCenter(center); // var center = new google.maps.LatLng(50,3,10.9);
    });*/
  }

  

  setMarker() {
    let marker = new google.maps.Marker({
    position: this.defaultLatLng,
    title: this.mapData.name,
    draggable: false,
    animation: google.maps.Animation.DROP,

    });
    marker.setMap(this.map);

  }

}


// composant map input donnee output element selectionné 
// composant detail map input element selectionné 
// funciton marker a ajouter
