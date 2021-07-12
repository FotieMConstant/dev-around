<template>
  <span>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="name"></v-list-item-title>

          <v-list-item-subtitle v-text="location"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
  </span>
</template>

<script>
export default {
  props: {
    id: Number,
    name: String,
    photoURL: String,
    location: String,
  },
  data() {
    return {};
  },
};
</script>