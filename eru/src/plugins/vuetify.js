import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

// importing the colors
import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.blue,
            secondary: colors.grey.darken1,
            accent: colors.shades.black,
            error: colors.red.accent3,
          },
          dark: {
            primary: colors.blue,
          },
        },
      },
});
