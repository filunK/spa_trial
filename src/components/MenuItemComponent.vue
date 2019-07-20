<template>
    <router-link :to="LinkTarget">
        <v-list-tile>
            <v-list-tile-action>
                <v-icon>{{Icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{LinkTitle}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Env } from '@/utils/Env';
import {Rules} from '@/utils/Rules';

@Component({
  components: {
  },
})
export default class MenuItemComponent extends Vue {

    @Prop({
        type: String,
        required: true
    })
    public LinkTarget: string | undefined;

    @Prop({
        type: String,
        required: true
    })
    public LinkTitle: string | undefined;

    @Prop({
        type: String,
        required: false
    })
    public IconName: string | undefined;

    public get IsIconNameAvailable(): boolean {
        return this.IconName? true: false;
    }

    public get Icon(): string {
        return this.IconName? this.IconName: 'web';
    }

}
</script>
