<template>
    <v-container>
        <v-form 
            ref="form"
            v-model="isRegistEnable" 
        >
            <v-layout justify-center>
                <v-flex xs12>
                    <v-text-field 
                        label="ユーザ名" 
                        clearable
                        v-model="registUsername"
                        :rules="[rules.username]"
                    ></v-text-field>
                    <v-text-field 
                        label="パスワード"  
                        clearable
                        v-model="registPassword"
                        :rules="[rules.password]"
                    ></v-text-field>
                    <v-text-field 
                        label="メールアドレス"  
                        clearable
                        v-model="registMailAddress"
                        :rules="[rules.mailadress]"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout text-right>
                <v-flex xs12>
                    <v-btn color="primary" :loading="IsButtonLoading" :disabled="!isRegistEnable" @click="DoRegist">登録</v-btn>
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
export default class RegistUserComponent extends Vue {

    @Prop({
        type: Boolean,
        required: false,
        default: false,
    })
    public IsButtonLoading?: boolean;

    public registUsername: string = '';

    public registPassword: string = '';

    public registMailAddress: string = '';

    public isRegistEnable: boolean = false;

    public rules = {
        username: Rules.UsernameRule,
        password: Rules.PasswordRule,
        mailadress: Rules.MailAddressRule,
    };

    /**
     * DoLogin
     */
    @Emit('OnUserRegistExecute')
    public DoRegist(): UserModel {

        const user = new UserModel();
        user.UserName = this.registUsername;
        user.Password = this.registPassword;
        user.MailAddress = this.registMailAddress;
        return user;
    }

}
</script>

<style lang="scss" scoped>

</style>
