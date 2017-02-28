import { Component, AfterContentInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { LatLng, LatLngBounds, MapsAPILoader } from 'angular2-google-maps/core';

declare var google: any;

/**
 * This class represents the navbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements AfterContentInit {
  @Output() public placeUpdated = new EventEmitter();

  @ViewChild('searchInput') private searchInputRef: ElementRef;

  private _place: any;

  public constructor(private _loader: MapsAPILoader) {

  }

  public ngAfterContentInit() {
    this._loader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchInputRef.nativeElement, {});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        let place = autocomplete.getPlace();
        this._place = place;
        this.placeUpdated.emit(place);
      });
    });
  }

  public get place() {
    return this._place;
  }
}
