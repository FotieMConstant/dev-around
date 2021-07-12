<template>
  <v-app>
    <AppbarComponent />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppbarComponent from "@/components/AppbarComponent";
export default {
  name: "App",
  components: {
    AppbarComponent,
  },
};
</script>
<style>
html {
  overflow: hidden; /* hide the scrollbar */
}
</style>
