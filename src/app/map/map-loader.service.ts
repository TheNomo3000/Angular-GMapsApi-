import { Injectable } from '@angular/core';

@Injectable()

export class MapLoaderService {
  private static promise: Promise<any>;
  public static load(): Promise<any> {
    const browserKey = 'AIzaSyAtis3nH-2p1ZqfIxbrxS_PmU2fh8s6Zng';
    const map = {
      URL: 'https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=' + browserKey + '&callback=__onGoogleLoaded',
    };

    // First time 'load' is called?
    if (!this.promise) {

      // Make promise to load
      this.promise = new Promise(resolve => {
        this.loadScript(map.URL);
        // Set callback for when google maps is loaded.
        window["__onGoogleLoaded"] = ($event) => {
          resolve('google maps api loaded');
        };
      });
    }
    return this.promise;
  }

  static loadScript(src, callback?): void {
    let r = false;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function() {
      if (!r && (! this.readyState || this.readyState === 'complete')) {
        r = true;
        if (typeof callback === 'function') {
          callback();
        }
      }
    };
    const t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }
}
