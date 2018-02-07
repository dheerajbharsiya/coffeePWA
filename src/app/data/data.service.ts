import { PlaceLocation } from './../logic/placeLocation';
import { Coffee } from './../logic/coffee';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  private endPoint = "http://localhost:3000";

  getCoffeeById(id: string, callback) {
    this.http.get(`${this.endPoint}/coffees/${id}`).subscribe(resp => {
      let response = resp.json();
      callback(response);
    });
  }


  getList(callback) {
    console.log('in method');
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };
    try {
      // this.http.get(`${this.endPoint}/coffees`, requestOptions).subscribe(resp => {
      //   let response = resp.json();
      //   if(response.status !== 200) {
      //     callback(coffeList);
      //   } else callback(response);
      //   console.log(response);
      // });
      const coffeList = [
        new Coffee('espress', 'starbucks', new PlaceLocation('127', 'delhi')),
        new Coffee('latte', 'durga cafe', new PlaceLocation('1', 'mumbai')),
        new Coffee('espress', 'yes cafe', new PlaceLocation('12', 'indore')),
        new Coffee('espress', 'new cafe', new PlaceLocation('123', 'delhi'))
      ];
  
      callback(coffeList);
    } catch (err) {
      callback('klfsd');

    }

  }

  save(coffee, callback) {
    if (coffee._id) {
      this.http.put(`${this.endPoint}/coffees/${coffee._id}`, coffee).subscribe(resp => {
        console.log(resp.json());
        callback(true);
      });
    } else {
      this.http.post(`${this.endPoint}/coffees`, coffee).subscribe(resp => {
        console.log(resp.json());
        callback(true);
      });
    }
    callback(true);
  }

}
