import { Coffee } from './../logic/coffee';
import { DataService } from './../data/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from '../coffee-service/geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: [Coffee];
  constructor(private data: DataService, private router: Router, private geoLocation: GeolocationService) { }

  ngOnInit() {
    this.data.getList(list => {
      this.list = list;
    });
  }

  updateCoffee(coffee: Coffee) {
   this.router.navigate(['/coffee', coffee._id]); 
  }

  goMap(coffee: Coffee) {
   location.href = this.geoLocation.getMapLink(coffee.location);
  }

  share(coffee: Coffee) {
    console.log('share');
    if('share' in navigator) {
      (navigator as any).share({
        title: coffee.name,
        text: `we are having coffe from ${coffee.place}`,
        url: window.location.href
      }).then(()=>{
        console.log('shared');
      }).catch(()=>{
        console.log('some error in sharing');
      });
    } else {
      const shareUrl = `whatsapp://send?text= we had coffee at ${coffee.place}`;
      location.href = shareUrl;
    }
  }

}
