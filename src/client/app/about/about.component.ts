import { Component, AfterContentInit } from '@angular/core';
import { PiwikTracker } from '../shared/piwik/piwik.service';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent implements AfterContentInit {
  public ngAfterContentInit(): void {
    PiwikTracker.TrackEvent('aboutViewed');
  }
}
