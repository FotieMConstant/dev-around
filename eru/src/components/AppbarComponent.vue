
<template>
  <span id="app">
    <v-navigation-drawer v-model="drawerRight" app clipped right>
      <v-subheader>Developers around you! </v-subheader>
      <v-list v-for="dev in devs" :key="dev.id" dense>
        <DevProfileComponent
          :id="dev.id"
          :name="dev.name"
          :photoURL="dev.photoURL"
          :location="dev.location"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right color="primary" dense dark>
      <v-toolbar-title>Devaround</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.stop="drawerRight = !drawerRight"
      ></v-app-bar-nav-icon>
    </v-app-bar>
  </span>
</template>
<script>
import DevProfileComponent from "./DevProfileComponent";
export default {
  components: {
    DevProfileComponent,
  },
  data() {
    return {
      drawerRight: null,
      devs: [
        {
          id: 1,
          name: "fotiecodes",
          photoURL: "https://avatars.githubusercontent.com/u/42372656?v=4",
          location: "within 10km",
        },
        {
          id: 2,
          name: "yancodes",
          photoURL: "https://avatars.githubusercontent.com/u/44243880?v=4",
          location: "within 10km",
        },
        {
          id: 3,
          name: "Longla",
          photoURL: "https://avatars.githubusercontent.com/u/44490676?v=4",
          location: "within 2m",
        },
        {
          id: 4,
          name: "Kelvin",
          photoURL: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          location: "within 10km",
        },
        {
          id: 5,
          name: "Maxime",
          photoURL: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          location: "within 10km",
        },
        {
          id: 6,
          name: "Maxime",
          photoURL: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          location: "within 10km",
        },
        {
          id: 7,
          name: "Maxime",
          photoURL: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          location: "within 10km",
        },
      ],
    };
  },
};
</script>