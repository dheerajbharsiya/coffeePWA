import { PlaceLocation } from './placeLocation';
import { TastingRating } from './tastingRating';
export class Coffee {
    _id: string;
    type: string;
    rating: null;
    notes: string;
    tastingRating: TastingRating;

    constructor(public name: string = "", public place: string = "", public location: PlaceLocation = null) {
        this.location = new PlaceLocation("","");
        this.tastingRating = new TastingRating();
    }

}