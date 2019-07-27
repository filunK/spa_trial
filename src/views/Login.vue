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

import {Auth} from '@/utils/Auth';
import { Env } from '@/utils/Env';
import {UserModel} from '@/models/UserModel';

import {LoginRequest} from '@/models/apiModels/V1/LoginRequest';

import {TokenStorage} from '@/dataAccess/tableModel/TokenStorage';
import { DexieContext } from '@/dataAccess/DexieContext';

@Component({
  components: {
    LoginComponent,
  },
})
export default class Login extends Vue {

    public isLoading: boolean = false;

    public async Login(user: UserModel) {

        this.isLoading = true;

        // アプリ内モデルをAPI向けモデルに変換
        const apimodel = new LoginRequest();
        apimodel.UserName = user.UserName;
        apimodel.Password = user.Password;

        try {
            const tokens = await Auth.Login(apimodel);
            console.log('login.vue -- API-OK');

            // tokenをIndexedDBに保存する。
            const accessToken = new TokenStorage(Env.Instance.Storage.AccessTokenKey, tokens.token);
            const refreshToken = new TokenStorage(Env.Instance.Storage.RefreshTokenKey, tokens.refresh);

            const db = new DexieContext();
            try {
                db.SaveTokens([
                    accessToken,
                    refreshToken,
                ]);
                console.log('login.vue -- SAVE OK');

            } catch (error) {
                console.log('login.vue -- SAVE NG');

            }

        } catch (error) {
            console.log('login.vue -- API NG');
            console.log(error);

        } finally {
            this.isLoading = false;

        }

    }
}
</script>

<style lang="scss" scoped>

</style>
