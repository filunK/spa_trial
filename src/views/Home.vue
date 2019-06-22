<template>
  <v-container>
    <v-layout justify-center>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="50"
        ></v-img>
    </v-layout>
    <HelloWorld />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
