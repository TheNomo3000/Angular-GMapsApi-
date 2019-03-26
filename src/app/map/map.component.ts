import { MapLoaderService } from './map-loader.service';
import { Component, AfterViewInit } from '@angular/core';

declare const google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map: any;
  drawingManager: any;
  poly: any;
  constructor() {}

  ngAfterViewInit() {
    MapLoaderService.load().then(() => {
      this.loadMap();
      this.drawPolygon();
    });
  }

  loadMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.416775, lng: -3.703790 },
      zoom: 18,
      mapTypeId: 'satellite',
      heading: 90,
      tilt: 0
    });
  }

  drawPolygon() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      draggable: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon'],
        draggable: true,
      },
      polygonOptions: {
        strokeColor: '#eb6e34',
        fillColor: '#eb6e34',
        fillOpacity: 0.3,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        draggable: true,
        zIndex: 1
      }
    });

    this.drawingManager.setMap(this.map);
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        alert(event.overlay.getPath().getArray());
      }
    });
  }
}
