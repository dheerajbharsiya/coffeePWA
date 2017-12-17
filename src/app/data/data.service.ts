import { PlaceLocation } from './../logic/placeLocation';
import { Coffee } from './../logic/coffee';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  getList(callback) {
    const coffeList = [
      new Coffee('espress', 'starbucks', new PlaceLocation('127', 'delhi')),
      new Coffee('latte', 'durga cafe', new PlaceLocation('1', 'mumbai')),
      new Coffee('espress', 'yes cafe', new PlaceLocation('12', 'indore')),
      new Coffee('espress', 'new cafe', new PlaceLocation('123', 'delhi'))
    ];
    callback(coffeList);
  }

  save(Coffee: Coffee, callback) {
    callback(true);
  }

}
