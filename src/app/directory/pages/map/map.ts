import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage /*implements OnInit*/ {

  @ViewChild('map') mapElement: ElementRef;
  @Input() mapData;
  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay: any;
  loading: boolean = true;
  latLngOrigin: any;
  latLngDestination: any; 
  constructor(public modalCtrl: ModalController) {
  }

  calcRoute() {
    let request = {
      origin: this.latLngOrigin,
      destination: this.latLngDestination,
      travelMode: google.maps.TravelMode.TRANSIT
    };
    this.directionsService.route(request, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setMap(this.map);
         this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));

      }
    });
  }



  loadMap() {
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    if (this.mapData.lat !== 0 && this.mapData.lng !== 0) {
      this.latLngDestination = new google.maps.LatLng(+this.mapData.lat, +this.mapData.lng);
    }
    //this.latLngOrigin = this.defaultLatLng;
    Geolocation.getCurrentPosition().then((resp) => {
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;
      this.latLngOrigin = new google.maps.LatLng(+lat, +lng);
      let mapOptions = {
        center: this.latLngOrigin,
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      if (this.map) {
        console.log(this.map);
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          google.maps.event.trigger(this.map, 'resize');
          if (this.latLngDestination) {
            this.calcRoute();
          } else {
            this.setMarkerOrigin();
          }
          //this.map.setCenter(this.latLngDestination); 
        });
      }
      //this.setMarkerOrigin();
      //this.setMarker();


      this.loading = false;
    }).catch((error) => {
      alert(error);
    });


    //this.setMarker();
  }



  setMarker() {
    let marker = new google.maps.Marker({
      position: this.latLngDestination,
      title: this.mapData.name,
      draggable: false,
      animation: google.maps.Animation.DROP,

    });
    marker.setMap(this.map);

  }
  setMarkerOrigin() {
    let marker = new google.maps.Marker({
      position: this.latLngOrigin,
      title: "vous",
      draggable: false,
      animation: google.maps.Animation.DROP,

    });
    marker.setMap(this.map);

  }
}


// composant map input donnee output element selectionné 
// composant detail map input element selectionné 
// funciton marker a ajouter
