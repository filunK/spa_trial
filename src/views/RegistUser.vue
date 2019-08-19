<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs10 sm8 md6 lg4>
                <RegistUserComponent @OnUserRegistExecute="DoRegist" :IsButtonLoading="isLoading"/>
            </v-flex>
        </v-layout>
        <v-layout justify-center v-if="isErrorReceived">
            <v-flex xs10 sm8 md6 lg4>
                <p class="error--text">{{errorMessage}}</p>
            </v-flex>
        </v-layout>
        <v-overlay :value="isRegistExecuted" :opacity="0.7" :absolute="true">
            <v-layout justify-center>
                <v-flex xs12>
                    <v-card>
                        <v-card-title>ユーザ登録の承認のため、コピー先URIにアクセスしてください。</v-card-title>
                        <v-list>
                            <v-list-item-title>有効期限：</v-list-item-title>
                            <v-list-item-subtitle>
                                {{expireLimit}}
                            </v-list-item-subtitle>
                        </v-list>
                        <v-card-actions>
                            <v-btn class="clipboardable" color="primary" :data-clipboard-text="confirmApi">URLをコピー</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-overlay>
    </v-container>    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Clipboard from 'clipboard';
import { UserModel } from '@/models/UserModel';
import { RegistRequest } from '@/models/apiModels/V1/RegistRequest';
import { RegistResponse } from '@/models/apiModels/V1/RegistResponse';
import { IAxiousHttpError } from '@/exceptions/IAxiousHttpError';

import RegistUserComponent from '@/components/RegistUserComponent.vue';
import { Auth } from '@/utils/Auth';
import { Env } from '@/utils/Env';

@Component({
  components: {
      RegistUserComponent,
  },
})
export default class RegistUser extends Vue {

    public isLoading: boolean = false;

    public confirmApi: string = '';

    public expireLimit: Date = new Date();

    public isRegistExecuted: boolean = false;

    public isErrorReceived: boolean = false;
    public errorMessage: string = '';

    public async DoRegist(model: UserModel): Promise<void> {
        this.isLoading = true;

        const request = new RegistRequest();
        request.UserName = model.UserName;
        request.Password = model.Password;
        request.MailAddress = model.MailAddress;

        try {
            const response = await Auth.Regist(request);

            this.confirmApi = Env.Instance.ApiBaseUri + '/' + response.confirmUri;
            this.expireLimit = response.limits;
            this.isRegistExecuted = true;

        } catch (error) {
            console.log('RegistUser.vue -- API NG');
            console.log(error);

            const axiousError = error as IAxiousHttpError;

            if (axiousError.response) {
                if (axiousError.response.status !== 400) {
                    // 要件エラー
                    this.errorMessage = 'ユーザID・パスワード・メールアドレスの要件が満たされていません。';
                    this.isErrorReceived = true;
                }
                if (axiousError.response.status !== 403) {
                    // ユーザ重複
                    this.errorMessage = 'ユーザIDがすでに登録されています。他のユーザ名を使用してください。';
                    this.isErrorReceived = true;
                }
            }

            // その他エラー
            this.errorMessage = 'サーバが想定外のエラーを返しました。';
            this.isErrorReceived = true;

        } finally {
            this.isLoading = false;
        }

    }

}
</script>

<style lang="scss" scoped>
.text-breakable {
    word-break: break-all;
}
</style>