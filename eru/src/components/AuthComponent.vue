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
        <v-btn @click="githubAuthorize">Github auth </v-btn>
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
import store from "@/store";
const axios = require("axios");

export default {
  data() {
    return {
      overlay: false,
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      domain: process.env.VUE_APP_DOMAIN,
      api_domain: process.env.VUE_APP_API_DOMAIN,
      snackbarNotification: {
        snackMessage: "No data",
        status: false,
        color: "",
        displayTime: 3000,
      },
    };
  },

  mounted: function () {
    this.githubSignInGetCodeFromUrl();
    this.authWithToken(); // on mount try authenticating the user
  },
  methods: {
    // github function to authorize a user and get code
    githubAuthorize() {
      console.log("Trying to reach github for auth");
      // console.log(this.client_id);
      // console.log(this.client_secret);
      // console.log(this.domain);
      this.overlay = true; //show loader when loading google auth
      // redirect the user to get their credentials
      window.location.href =
        "https://github.com/login/oauth/authorize?client_id=" +
        this.client_id +
        "&redirect_uri=" +
        this.domain +
        "/auth&scope=read:user";
    },
    // function to get code from url
    githubSignInGetCodeFromUrl() {
      // if the data in the url is true
      if (this.$route.query.code) {
        const code = this.$route.query.code;
        console.log("auth code => " + code);
        // once i got the code
        this.githubSignIn(code);
      } else {
        console.log("There is no code from github");
      }
    },
    // End of github SignIn
    // github signin method
    async githubSignIn(code) {
      this.overlay = true; //show loader when loading google auth
      try {
        // getting the token from my own custom api returned to me
        const response = await axios.get(
          `${this.api_domain}/v1/gh_access_token/${code}`
        );
        console.log(response.data);
        // checking if there were any errors
        if (response.data.error) {
          this.overlay = false; //hide loader
          this.snackbarNotification.status = true;
          this.snackbarNotification.color = "red";
          this.snackbarNotification.snackMessage =
            "Error: " + response.data.error_description; //error from backend
          this.snackbarNotification.displayTime = 6000;
        } else {
          // in the case where everything is good
          store.commit("setAccess_token", response.data.access_token);
          this.authWithToken(); // when all is good i want to authenticate the user
        }
        console.log("from store => " + store.state.access_token);
      } catch (error) {
        this.overlay = false; //hide loader
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = "red";
        this.snackbarNotification.snackMessage = error;
        this.snackbarNotification.displayTime = 6000;
      }
    },
    // End of github SignIn
    // function to authenticate user with token
    async authWithToken() {
      // only auth if token is in store
      if (store.state.access_token) {
        console.log("Authenticating with token...");
        try {
          let response = await axios.get(`https://api.github.com/user`, {
            headers: {
              Authorization: `Bearer ${store.state.access_token}`, // passing the token from store
            },
          });
          response = response.data;
          console.log("Return data => ");
          // console.log(response);
          store.commit("setCurrentUser", response); // setting logged in user to store
          console.log(store.state.currentUser);
          this.$router.push("/");
        } catch (error) {
          this.overlay = false; //hide loader
          this.snackbarNotification.status = true;
          this.snackbarNotification.color = "red";
          this.snackbarNotification.snackMessage = error;
          this.snackbarNotification.displayTime = 6000;
        }
      } else {
        console.log("Not authenticating yet!");
      }
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
#wrapper {
  margin-top: 90px;
}
</style>
