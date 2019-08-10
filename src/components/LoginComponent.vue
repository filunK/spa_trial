<template>
    <v-container>
        <v-form 
            ref="form"
            v-model="isLoginEnable" 
        >
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
            <v-layout text-right>
                <v-flex xs12>
                    <v-btn color="primary" :loading="IsLoginButtonLoading" :disabled="!ButtonState"  @click="DoLogin">ログイン</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Env } from '@/utils/Env';
import {Rules} from '@/utils/Rules';

import {UserModel} from '@/models/UserModel';

@Component({
  components: {
  },
})
export default class LoginComponent extends Vue {

    @Prop({
        type: Boolean,
        required: false,
        default: false,
    })
    public IsLoginButtonLoading?: boolean;

    @Prop({
        type: Boolean,
        required: false,
        default: true,
    })
    public IsButtonEnable?: boolean;

    public loginUsername: string = '';

    public loginUserpassword: string = '';

    public isLoginEnable: boolean = false;

    public rules = {
        username: Rules.UsernameRule,
        password: Rules.PasswordRule,
    };


    public get ButtonState(): boolean {
        if (this.isLoginEnable && this.IsButtonEnable) {
            return true;
        } else {
            return false;
        }
    }

    public LoginConponent() {
        this.loginUsername = '';
        this.loginUserpassword = '';
    }

    /**
     * DoLogin
     */
    @Emit('OnLoginExecute')
    public DoLogin(): UserModel {

        const user = new UserModel();
        user.UserName = this.loginUsername;
        user.Password = this.loginUserpassword;
        return user;
    }

}
</script>

<style lang="scss" scoped>

</style>
