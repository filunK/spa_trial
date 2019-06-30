<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12>
                <v-text-field 
                    label="ユーザ" 
                    clearable
                    v-model="loginUsername"
                    :rules="[rules.username]"
                ></v-text-field>
                <v-text-field 
                    label="パスワード"  
                    clearable
                    v-model="loginUserpassword"
                    :rules="[rules.password]"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout text-xs-right>
            <v-flex xs12>
                <v-btn color="primary" :loading="buttonLoading"  @click="DoLogin">ログイン</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import {Rules} from '@/utils/Rules';

@Component({
  components: {
  },
})
export default class LoginComponent extends Vue {

    public loginUsername: string = '';

    public loginUserpassword: string = '';

    public buttonLoading: boolean = false;

    public rules = {
        username: Rules.UsernameRule,
        password: Rules.PasswordRule,
    };

    public LoginConponent() {
        this.loginUsername = '';
        this.loginUserpassword = '';
        this.buttonLoading = false;
    }

    /**
     * DoLogin
     */
    public DoLogin() {
    }

}
</script>

<style lang="scss" scoped>

</style>
