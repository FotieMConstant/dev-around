<template>
  <span>
    <v-card
      id="wrapper"
      class="pa-12 mx-auto"
      elevation="12"
      height="440"
      max-width="500"
    >
      <v-row justify="center">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>Devaround</span> </v-card-title
        ><br />
      </v-row>
      <v-row justify="center">
        <v-btn @click="githubSignIn">Github auth </v-btn>
        <!-- message -->
        <div>
          <v-container>
            See developers around you on dev-around. Connect, network and grow
            with local developers.
            <div class="mt-5">
              Basic Features
              <ul>
                <li>Open Signups</li>
              </ul>
            </div>
          </v-container>
        </div>
      </v-row>
      <!-- /message -->
      <!-- notification snackbar -->
      <v-snackbar
        :color="snackbarNotification.color"
        v-model="snackbarNotification.status"
        :timeout="snackbarNotification.displayTime"
      >
        {{ snackbarNotification.snackMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbarNotification.status = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
      <!-- / notification snackbar -->
      <!-- overlay loader-->
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <!-- overlay loader-->
    </v-card>
  </span>
</template>

<script>
// import store from "@/store";
const axios = require("axios");

export default {
  data() {
    return {
      overlay: false,
      snackbarNotification: {
        snackMessage: "No data",
        status: false,
        color: "",
        displayTime: 3000,
      },
    };
  },
  methods: {
    // Google signin method
    async githubSignIn() {
      this.overlay = true; //show loader when loading google auth
      try {
        const response = await axios.get(
          "https://github.com/login/oauth/authorize",
          {
            client_id: "b034464b59c69d255fef",
            redirect_uri: "http://localhost:8080/",
          }
        );
        console.log(response);
        console.log("try");
      } catch (error) {
        this.overlay = false; //hide loader when loading google auth
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = "red";
        this.snackbarNotification.snackMessage = error;
        this.snackbarNotification.displayTime = 6000;
      }
    },
    // End of google SignIn
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
#wrapper {
  margin-top: 90px;
}
</style>
