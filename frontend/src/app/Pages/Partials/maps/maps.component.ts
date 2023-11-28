import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
 
export class MapsComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  constructor(private renderer: Renderer2) { }
  
    ngOnInit(): void {
      // Set the default selected country ID (Lebanon)
      this.selectedCountryId = '0';
      this.center = {
        lat: 33.854721,
        lng: 35.862286
      };
    }
  
  //Media Query
  ngAfterViewInit(): void {
    // Adjust the map container width based on the media query
    const mediaQuery = window.matchMedia('(max-width: 1300px)');
    this.handleMediaQuery({ matches: mediaQuery.matches } as MediaQueryListEvent); // Set initial state
    mediaQuery.addEventListener('change', (e) => this.handleMediaQuery(e));
  }
  private handleMediaQuery(event: MediaQueryListEvent): void {
    const isSmallScreen = event.matches;
    const mapContainer = this.mapContainer.nativeElement.querySelector('.map-container');
    // console.log("event.matches: ", isSmallScreen)
    // console.log("map container: ", mapContainer)
    if (mapContainer) {
      let mapContainerWidth: string = '850px';
      let mapContainerHeight: string = '500px';
      
      if (window.matchMedia('(max-width: 400px)').matches) {
        mapContainerWidth = '125px';
        mapContainerHeight = '200px';
        // this.zoom = 4
      }
      else {
        
        if (window.matchMedia('(max-width: 400px)').matches) {
          mapContainerHeight = '200px';
          mapContainerWidth = '200px';
          // this.zoom = 5
        }
        else {
          
          if (window.matchMedia('(max-width: 500px)').matches) {
            mapContainerWidth = '300px';
            mapContainerHeight = '300px';
            // this.zoom = 6
          }
          else {
            
            if (window.matchMedia('(max-width: 870px)').matches) {
              mapContainerWidth = '400px';
              mapContainerHeight = '500px';
              // this.zoom = 7
            }
            else {
              
              if (window.matchMedia('(max-width: 1004px)').matches) {
                mapContainerWidth = '500px';
                // this.zoom = 8
              }
              else {
                if (window.matchMedia('(max-width: 1300px)').matches) {
                  mapContainerWidth = '600px';
                  // this.zoom = 9
                }
                
                else {
                  mapContainerWidth = '850px';
                  // this.zoom = 10
                }
              }
            }
          }
        }
      }
      this.renderer.setStyle(mapContainer, 'width', mapContainerWidth);
      this.renderer.setStyle(mapContainer, 'height', mapContainerHeight);
    }
  }

  
  // private handleMediaQuery(event: MediaQueryListEvent): void {
  //   const isSmallScreen = event.matches;
  //   const mapContainer = this.mapContainer.nativeElement.querySelector('.map-container');

  //   if (mapContainer) {
  //     let mapContainerWidth: string;
  //     // let mapContainerHeight: string = ''; // Initialize with an empty string

  //     if (isSmallScreen) {
  //       console.log("670px")
  //       mapContainerWidth = window.matchMedia('(max-width: 670px)').matches ? '450px' : '570px';
  //     } else {
  //       console.log("not 670px")
  //       if (window.matchMedia('(max-width: 548px)').matches) {
  //         console.log("548px")
  //         mapContainerWidth = '335px';
  //         console.log("width: ", mapContainerWidth)
  //         // mapContainerHeight = '400px';
  //       } else {
  //         console.log("1300px")
  //         mapContainerWidth = '850px';
  //       }
  //     }

  //     this.renderer.setStyle(mapContainer, 'width', mapContainerWidth);

  //     // if (mapContainerHeight) {
  //     //   this.renderer.setStyle(mapContainer, 'height', mapContainerHeight);
  //     // }
  //   }
  // }

  //countries
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 33.854721,
    lng: 35.862286
  };
  zoom = 6;

  selectedCountryId: string | null = null; // Track the currently selected country ID

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = (event.latLng.toJSON());
      this.selectedCountryId = null; // Reset the selected country when moving the map
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  countries = [
    {
      id: '0',
      name: 'Lebanon',
      lat: '33.854721',
      lng: '35.862286'
    },
    {
      id: '1',
      name: 'Qatar',
      lat: '25.354826',
      lng: '51.183884'
    },
    {
      id: '2',
      name: 'UAE',
      lat: '23.424076',
      lng: '53.847816'
    },
    {
      id: '3',
      name: 'KSA',
      lat: '23.885942',
      lng: '45.079163'
    },
    {
      id: '4',
      name: 'UK',
      lat: '55.378052',
      lng: '-3.435973'
    },
    {
      id: '5',
      name: 'Netherlands',
      lat: '52.132633',
      lng: '5.291266'
    },
  ];

  onCountryClick(country: any) {
    this.center = {
      lat: parseFloat(country.lat),
      lng: parseFloat(country.lng)
    };
    this.selectedCountryId = country.id; // Set the selected country
    this.zoom = 7; // Reset zoom level when changing countries
  }

}
