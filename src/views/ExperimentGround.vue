<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12>
                <h4>Let's examine your Components!!</h4>
                <h6>BookEditComponent</h6>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs6>
                <!-- <RegistUserComponent /> -->
                <BookInfoEditComponent CardTitle="aaaaa"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import RegistUserComponent from '@/components/RegistUserComponent.vue';
import BookInfoEditComponent from '@/components/BookInfoEditComponent.vue';

@Component({
  components: {
    HelloWorld,
    LoginComponent,
    RegistUserComponent,
    BookInfoEditComponent,
  },
})
export default class ExperimentGround extends Vue {}
</script>

<style lang="scss" scoped>

</style>
