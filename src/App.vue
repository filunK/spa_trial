<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-toolbar-title class="headline">
        <router-link to="/">Home</router-link>
        <router-link to="/About">About</router-link>
      </v-toolbar-title>
      <v-spacer />

      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang = "ts">
import {Vue, Component} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

@Component
export default class App extends Vue {}
</script>
