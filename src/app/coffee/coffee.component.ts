import { GeolocationService } from './../coffee-service/geolocation.service';
import { Coffee } from './../logic/coffee';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {

  routerSubscription: any;
  coffee: Coffee;
  types: [string] = ['cappechino', 'espresso'];
  coffeeDetailForm: FormGroup;
  constructor(private route: ActivatedRoute, private geolocation: GeolocationService) {
  }

  ngOnInit() {

    this.coffee = new Coffee();
    this.coffeeDetailForm = new FormGroup({
      'name': new FormControl(null),
      'place': new FormControl(null),
      'types': new FormControl(this.types),
      'notes': new FormControl(null),
      'address': new FormControl(null),
      'city': new FormControl(null),
      'overallRating': new FormControl(null),
      'aromaRating': new FormControl(null)
    });

    this.geolocation.requestLocation(location => {
      if (location) {
        this.coffee.location.latitude = location.lattitude;
        this.coffee.location.longitude = location.longitude;
      }
    });

    this.routerSubscription = this.route.params.subscribe((params) => {
      console.log(params.id);
    });

  }

}
