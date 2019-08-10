<template>
    <v-container>
        <v-layout justify-center v-if="isLoggedIn">
            <v-flex xs10 sm8 md6 lg4>
                <p headline font-weight-light >{{loginUserName}}としてログインしています。</p>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs10 sm8 md6 lg4>
                <LoginComponent @OnLoginExecute="Login" :IsLoginButtonLoading="isLoading" :IsButtonEnable="!isLoggedIn"/>
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

    public loginUserName: string = '';

    public isLoggedIn: boolean = false;


    public async created() {

        try {
            const db = new DexieContext();
            const userInfo = await db.GetUserInfo();

            if (userInfo && userInfo.IsLoggedIn && userInfo.UserId) {
                this.isLoggedIn = userInfo.IsLoggedIn;
                this.loginUserName = userInfo.UserId;
            }

        } catch (error) {
            this.isLoggedIn = false;

        }

    }

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

                db.SaveUserInfo({
                    UserId: user.UserName,
                    IsLoggedIn: true,
                });
                console.log('login.vue -- SAVE OK');

                // ログイン処理後のリダイレクト
                const redirectTo = this.$route.query[Env.Instance.QueryStringKies.RedirectTo];

                if (redirectTo) {
                    this.$router.push({path: redirectTo as string});
                } else {
                    this.$router.push({path: '/'});
                }

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
