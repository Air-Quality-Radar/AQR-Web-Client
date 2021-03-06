declare var _paq: Array<any>;

export class PiwikTracker {
  public static TrackEvent(eventName: string, ...additionalInfo: any[]) {
    if (typeof _paq !== 'undefined' && _paq) {
      _paq.push(['trackEvent', eventName].concat(additionalInfo));
    }
  }
}
