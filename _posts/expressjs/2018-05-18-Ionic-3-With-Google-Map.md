---
layout: post
title:  "Google Map with Ionic 3 and Angular 5"
date:   2018-07-13 01:00:39
categories: 
---


### **Google Map Integration With Ionic 3 and Angular 5**

This article contians basics of Google Map integrtion with Ionic 3 and Angular 5. I'm going to implement bellow fetures of google map.

* Add Markers to google map
* Click Event Of google map
* Take Longitude and Latitude of the clicked location
* Pan to Click Location in the map
* Add Custom Markers to google map
* Add Multiple Markers and Remove Markers
* Show Info Window when click on Marker
* Show a Circle with a given location and Radius

Bonus features

* Handle click event of a Info Wndow with Angular
<!-- * open google map in ionic application and show direction -->

#### **Setup Google Map Inside the Project**

First of all you need to get a *API KEY* from Google Map API Console. You need a google account for that. [Here](https://developers.google.com/maps/documentation/javascript/get-api-key) is the link for google map developer console.

From devloper console click the **GET STARTED** button and follow the step to get a *API Key*. After that add this script tag to your **index.html** file in the Angular Project like bellow.

``` html
<script src="https://maps.googleapis.com/maps/api/jskey=YOUR_API_KEY"></script>
```



#### **Add Google Map Into Angular Component**

Add bellow code to you component template (inside the **ion-content**). We are going to load the google map inside this div.
You can define what ever size you want.

**google-map.html**
``` html
<ion-row class="google-map">
  <ion-col>
    <div #map id="map" style="height: 70vh; width: 100%;"></div>
  </ion-col>
</ion-row>
```

Next we need to define google map inside the Component like bellow.

**google-map.ts**
``` ts
...

declare var google;

@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapPage {
  @ViewChild('map') mapElement: ElementRef;

  _map: any;
  _location: {lat: number, lng: number};
  _markers = [];
}
``` 

Now we can access the google map object inside the GoogleMapPage component like bellow.

``` ts
...

// load the map after view init
ionViewDidLoad() {
  // define a location that you want load first
  this._location =  { lat: 8.0297, lng: 80.4538 };

  if (this.mapElement) {
    this.loadMap(this._location);
  }
}

loadMap(center: { lat: number, lng: number }) {
  this._map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 6,
    center
  });
}
```

#### **Add Marker**

Above code will load the google map inside the given div. Let's add a default marker into the map.
Add the bellow code snippet into your component. **Add Marker** function will add a marker into google map. Also, push the reference into **_markers** array because we need these refrence to remove the marker from map.

``` ts
private addMarker(position: { lat: number, lng: number }): void {
  const map = this._map;
  const marker = new google.maps.Marker({
    position, // position that marker needs to placed
    map, // referece of the map
    // animation to for marker.
    animation: google.maps.Animation.DROP
  });
  // we need to push makers to array. we need these references to remove our marker later
  this._markers.push(marker);
}

private loadMap(center: { lat: number, lng: number }) {
  this._map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 6,
    center
  });

  // add a marker to current location
  this.addMarker(this._location);
}
```


Let's add a click event to our map.

#### **Click Event And Location**

To listen click events we need to add an Event Listner to our google map like bellow.
**e(event)** contain the details of clicked location.

``` ts
private loadMap(center: { lat: number, lng: number }) {
  this._map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 10,
    center
  });

  // add a marker to current location
  this.addMarker(this._location);

  this._map.addListener('click', (e) => {
    const location = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    console.log("clicked location: ", location);
  });
}
```

open the console of your browser and see log when click event is fired. 

#### **Pan Map to Click Locaiton**

You can pan map to the clicked location. Let's add the **Pan** feature to the map.

``` ts
...
this._map.addListener('click', (e) => {
  const location = {lat: e.latLng.lat(), lng: e.latLng.lng()};
  console.log("clicked location: ", location);
  this.clearMap();
  this.panMapTo(location); // pan to select location
});
...

private panMapTo(location: { lat: number, lng: number }): void {
  this._map.panTo(location);
  this.addMarker(location);
}

```

Now we need to remove the previus marker. We can do it like bellow using the **_markers** array.
call to this function inside the map event listner.

```ts
...
private clearMap(): void {
  this._markers.forEach(marker => {
    marker.setMap(null);
  });
...
}
```

#### **Custom Marker**

We can add a custom marker into the google map.

``` ts

private addMarker(position: { lat: number, lng: number }): void {
  const map = this._map;
  const marker = new google.maps.Marker({
    position, // position that marker needs to placed
    map, // referece of the map
    icon: this.getCustomerMarker(),
    // animation to for marker.
    animation: google.maps.Animation.DROP
  });
  // we need to push makers to array. we need these references to remove our marker later
  this._markers.push(marker);
}

...
private getCustomerMarker(): any {
  return {
    // custom icon jpg
    url: 'https://cdn.slidesharecdn.com/profile-photo-kpalmer1382-48x48.jpg'
  }
}
...
```

#### **Adding Multiple Marker**

Adding multiple markers is same as adding a single marker. But we need to push all markers references to
**_markers** array.

#### **Adding click event to a marker and show Info Window**

We can bind a click event to marker and show a info window. But dificult part is handle click event inside a Info Window.
We will come to that bit later. Let's add event listner for markers.

``` ts
...
private showInfoWindow(marker: any): void {
  const infoWindow = new google.maps.InfoWindow();
  const content = '<div> Test InfoWindow </div>';

  google.maps.event.addListener(marker, 'click', ((marker) => {
      return () => {
        infowindow.setContent(content);
        infowindow.open(this._map, marker);
      };
    })(marker));
}

// invoke this function inside the addMarker function after create the marker.
...
```

Now you can see when click on a marker infowindow will appear like below.
![infowindow]({{"/assets/ionic-google-map/infowindow.png"}})

Let's add circle with a given diameter from the clicked location.

#### **Draw a Circle**

``` ts
...

private drawCircle(center: { lat: number, lng: number }, radius: number): void {
  // put this options inside the config.ts file.
  const GOOGLE_MAP_CIRCLE_OPTIONS = {
    strokeColor: '#039be5', // Circumference color of the circle
    strokeOpacity: 0.8, // Circumference opacity
    strokeWeight: 2, // Circumference line weight
    fillColor: '#039be5', // this is the color of circle
    fillOpacity: 0.35, // opacity of the circle
    visible: true, // visibility
  };
  const map = this._map;
  const circleOption = Object.assign({}, GOOGLE_MAP_CIRCLE_OPTIONS,
    {map, center, radius: radius * 1000 })
    // given radius is multiplied by thousand to convert it Kilometers
  const circle = new google.maps.Circle(circleOption);
  this._markers.push(circle); // I have added this circle refrence into _markers array because we need to remove this circle as well. If you want to keep it don't push to the array.
}


// invoke this function inside the click event of the map
...
this._map.addListener('click', (e) => {
  const location = {lat: e.latLng.lat(), lng: e.latLng.lng()};
  console.log("clicked location: ", location);
  this.clearMap();
  this.panMapTo(location); // pan to select location
  this.drawCircle(location, 10); // 10Km radius circle
});
...

```

Now you can see the circle with a radius 10Km when select a location like below.
![circle]({{"/assets/ionic-google-map/circle.png"}})

You can change the diameter using dropdown or slider to make this cool.

#### Bonus features

If you want to add a click event into the infowindow we need to do some extra works, because this infowindow is not accesible inside out Angular component. It is bound to DOM. We have to listen to the global events to achive this.

Let's implement click event in infowindow.

#### **Add Click event to Infowindow**

``` ts
// add this inside yout ngOnInit or constructor function

window['mapComponent'] = { // ading this component to window object to access public
  googleMapComponent: this
};
// may be this is not a good idea to make it accessible using window object. But for the moment I could not find any solution.


public onClickInfoWindow(somethins: any) {
  // do something
}


// change the content of the showInfoWindow function
const content = '<div> Test InfoWindow' +
                  '<button onclick="onClickInfoWindowButton()" >More </button>'
                '</div>';
```

Next we need to listen to global events in **index.html** file like below.
Add this code snippet to index.html file.

``` js
 // function for get google map infowindow click event
    function onClickInfoWindowButton(value) {
      try {
        if (!window.mapComponent) {
          console.log('No window.mapComponent');
          return;
        }
        if (!window.mapComponent.googleMapComponent) {
          console.log('No window.mapComponent.googleMapComponent');
          return;
        }
        window.mapComponent.googleMapComponent.onClickInfoWindow(value);
      } catch (ex) { console.log('Error on Method Call', ex) }
    }

```


Now you can see this click event of infowindow working perfectly like below.

![infowindowClick]({{"/assets/ionic-google-map/infowindow-click.png"}})


You can download the full source code from [here](https://github.com/AjanthaB/ionic-3-google-map.git);

Thak you. If you find this tutorial helps you, Please share this.