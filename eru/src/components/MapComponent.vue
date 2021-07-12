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
      zoom: 3,
      center: [47.41322, -1.219482],
      bounds: null,
    };
  },
  mounted() {
    var map = L.map("map").setView([3.846963, 11.55072], 13);

    L.tileLayer(this.url, {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }).addTo(map);

    var currentUserIcon = L.icon({
      iconUrl:
        "https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-File.png",
      iconSize: [30, 30], // size of the icon
      popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
    });
    L.marker([3.846963, 11.55072], {
      icon: currentUserIcon,
    })
      .addTo(map)
      .bindPopup("Your location")
      .openPopup();
  },

  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
};
</script>
<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
