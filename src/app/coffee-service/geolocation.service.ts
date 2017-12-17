import { PlaceLocation } from './../logic/placeLocation';
import { Injectable } from '@angular/core';
//import {PlaceLocation} from '../logic/placeLocation';

@Injectable()
export class GeolocationService {

  constructor() { }

  public requestLocation(callback): void {
    navigator.geolocation.getCurrentPosition(position => {
      callback(position.coords);
    }, error => {
      callback(null);
    });
  }

  public getMapLink(location: PlaceLocation): string {
    let query;
    if (location.latitude) {
      query = location.latitude + "," + location.longitude;
    } else {
      query = `${location.address}, ${location.city}`;      
    }

    if(/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.google.com/?q=${query}`;
    }

  }

}
