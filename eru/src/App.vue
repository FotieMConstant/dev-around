<template>
  <v-app>
    <AppbarComponent v-if="loggedIn" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppbarComponent from "@/components/AppbarComponent";
import store from "@/store";

export default {
  name: "App",
  components: {
    AppbarComponent,
  },
  computed: {
    // if the user is logged in display the appbar
    loggedIn() {
      console.log(store.state.currentUser);
      return store.state.currentUser;
    },
  },
};
</script>
<style>
html {
  overflow: hidden; /* hide the scrollbar */
}
</style>
