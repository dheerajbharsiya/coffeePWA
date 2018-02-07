import { GeolocationService } from './../coffee-service/geolocation.service';
import { Coffee } from './../logic/coffee';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  MatButtonModule, MatInputModule
} from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';
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
  public isTasteEnabled: boolean = false;
  constructor(private route: ActivatedRoute, private geolocation: GeolocationService, private router:Router, private dataService: DataService) {
  }

  public onSave(): void {
    this.dataService.save(this.coffee, result => {
      if(result) {  
        this.router.navigate(['/']);        
      }
    });
  }

  public onCancel(): void {
    this.router.navigate(['/']);
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
      console.log(params.id+"id is");
      if(params.id) {
        this.dataService.getCoffeeById(params.id, resp=>{
          this.coffee = resp;
          if(this.coffee.tastingRating) {
            this.isTasteEnabled = true;
          }
        });
      }
    });
  }

}
