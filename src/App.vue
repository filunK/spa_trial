<template>
  <v-app lang="ja">
    <v-navigation-drawer 
      fixed
      clipped
      app 
      v-model="navigationAvailable"
      >
        <v-list nav dense>
          <MenuItemComponent LinkTarget="/" LinkTitle="Home" IconName="home"/>
          <MenuItemComponent LinkTarget="/RegistUser" LinkTitle="ユーザ登録" IconName=""/>
          <MenuItemComponent LinkTarget="/Login" LinkTitle="Login" IconName=""/>
          <MenuItemComponent LinkTarget="/Authorized" LinkTitle="Authorized" IconName=""/>
          <MenuItemComponent LinkTarget="/About" LinkTitle="About" IconName=""/>
          <MenuItemComponent LinkTarget="/Experiments" LinkTitle="Experiments" IconName=""/>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar 
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="navigationAvailable = !navigationAvailable" />
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer />
      <!-- <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      > -->
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar >

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang = "ts">
import {Vue, Component} from 'vue-property-decorator';
import Clipboard from 'clipboard';
import HelloWorld from '@/components/HelloWorld.vue';
import MenuItemComponent from '@/components/MenuItemComponent.vue';
import { Env } from '@/utils/Env';

@Component({
  components: {
    MenuItemComponent,
  },
})
export default class App extends Vue {

  public clipboard: Clipboard = new Clipboard(Env.Instance.ClipboardableClassName);


  private navigationAvailable: boolean = false;

    public mounted() {
        this.clipboard.on('success', (e) => {
          alert('コピーしました。');
          e.clearSelection();
        });
        this.clipboard.on('error', (e) => {
          alert( 'コピーに失敗しました。' ) ;
        });
    }

}
</script>
