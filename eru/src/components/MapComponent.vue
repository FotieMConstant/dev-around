<template>
  <v-container>
    <v-row class="text-center">
      <div style="height: 350px"><div id="map"></div></div>
    </v-row>
  </v-container>
</template>

<script>
// If you need to reference 'L', such as in 'L.icon', then be sure to
// explicitly import 'leaflet' into your component
import L from "leaflet";

export default {
  name: "MapComponent",

  data() {
    return {
      url:
        "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=" +
        process.env.VUE_APP_API_KEY,
      geolocation: {
        longitude: null,
        latitude: null,
      },
    };
  },
  mounted() {
    this.getUserCurrentLocation(); // get user's current location
  },

  methods: {
    // zoomUpdated(zoom) {
    //   this.zoom = zoom;
    // },
    // centerUpdated(center) {
    //   this.center = center;
    // },
    // boundsUpdated(bounds) {
    //   this.bounds = bounds;
    // },
    getUserCurrentLocation() {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
      } else {
        console.log("Locating…");
        navigator.geolocation.getCurrentPosition(
          this.successfulGottenLocation,
          this.errorGettingLocation
        );
      }
    },
    // when the location is successfully gotten
    successfulGottenLocation(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);

      this.loadMap(latitude, longitude);
    },
    // function to handle when there's an error getting location
    errorGettingLocation() {
      alert("Unable to retrieve your location");
    },
    loadMap(latitude, longitude) {
      var map = L.map("map").setView([latitude, longitude], 13);

      L.tileLayer(this.url, {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      }).addTo(map);

      var currentUserIcon = L.icon({
        iconUrl: "https://avatars.githubusercontent.com/u/42372656?v=4", // https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-File.png
        iconSize: [40, 40], // size of the icon
        popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
      });
      L.marker([latitude, longitude], {
        icon: currentUserIcon,
      })
        .addTo(map)
        .bindPopup("Your location")
        .openPopup();
    },
  },
};
</script>
<style >
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.leaflet-marker-icon {
  border-radius: 30px;
  border: 3px solid rgb(255, 99, 71);
}
</style>
