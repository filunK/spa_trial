<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 xl4>
                <LoginComponent @OnLoginExecute="Login" :IsLoginButtonLoading="isLoading"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginComponent from '@/components/LoginComponent.vue';

import {Auth} from '@/utils/Auth'
import {UserModel} from '@/models/UserModel';

import {LoginRequest} from '@/models/apiModels/V1/LoginRequest';

@Component({
  components: {
    LoginComponent,
  },
})
export default class Login extends Vue {

    public isLoading:boolean = false;

    public Login(user: UserModel) {

        this.isLoading = true;

        // アプリ内モデルをAPI向けモデルに変換
        let apimodel = new LoginRequest();
        apimodel.UserName = user.UserName;
        apimodel.Password = user.Password;


        Auth.Login(apimodel)
        .then((tokens) => {
            console.log('login.vue -- OK');

            console.log(tokens);

            this.isLoading = false;
        })
        .catch(() => {
            console.log('login.vue -- NG');
            this.isLoading = false;
        });
    }
}
</script>

<style lang="scss" scoped>

</style>
