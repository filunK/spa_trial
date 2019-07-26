<template>
    <v-list-item>
        <v-list-item-action>
            <v-icon>{{Icon}}</v-icon>
        </v-list-item-action>
        <v-list-Item-content>
            <v-list-item-title>
                <router-link :to="LinkTarget">{{LinkTitle}}</router-link>
            </v-list-item-title>
        </v-list-Item-content>
    </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Env } from '@/utils/Env';
import {Rules} from '@/utils/Rules';
import {IconResolver} from '@/utils/IconResolver';

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
        const resolvedIconName = this.IconName? this.IconName: 'application';
        return IconResolver.MaterialDesignIconResolver(resolvedIconName);
    }

}
</script>
