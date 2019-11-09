<template>
<v-card min-height="300px">
  <v-card-title>
    <span class="headline">{{ CardTitle }}</span>
  </v-card-title>
  <v-form v-model="RegistButtonState">
    <v-card-text>
        <v-row>
          <v-col cols="10" md="10" sm="12">
            <v-text-field v-model="ComponentIsbn" label="ISBN番号" placeholder="ハイフン抜きの数値を入力してください。" :rules="[Rules.Isbn]" maxlength="13" @input="IsSearchButtonEnable" />
          </v-col>
          <v-col cols="2" md="2" sm="12">
            <v-btn color="primary" :loading="IsGetBookInfoButtonLoading" :disabled="!BookInfoButtonState"  @click="GetBookInfo">検索</v-btn>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-text-field v-model="ComponentTitle" label="タイトル" />
          </v-col>
          <v-col cols="9" md="9" sm="12">
            <v-text-field v-model="Author" label="著者" />
          </v-col>
          <v-col cols="3" md="3" sm="12">
            <v-text-field v-model="ComponentPageCount" label="ページ数" :rules="[Rules.PageCount]" />
          </v-col>
          <v-col cols="5" md="6" sm="12">
            <v-menu
              v-model="IsDatetimePickerEnable"
              :nudge-right=50
              transition="scale-transition"
              offset-y
              min-width="150px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="ComponentPurchaseDateString"
                  label="日付"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="ComponentPurchaseDateString" @input="IsDatetimePickerEnable = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-textarea v-model="ComponentComment" label="コメント・感想" row-height="5" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" @click="EmitClose">キャンセル</v-btn>
        <v-btn color="primary" @click="EmitRegist" :disabled="!RegistButtonState" >登録</v-btn>
      </v-card-actions>
  </v-form>

</v-card>
</template>

<style lang="scss">

</style>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import { Env } from '@/utils/Env';
import { Rules } from '@/utils/Rules';
import { Book } from '@/utils/Book';
import { IAxiousHttpError } from '@/exceptions/IAxiousHttpError';

import {BookModel} from '@/models/BookModel';
import {DialogMode} from '@/models/DialogMode';

@Component({
  components: {
  },
})
export default class BookEditComponent extends Vue {

  // 入力項目
  @Prop({
      type: String,
      required: true,
  })
  public CardTitle?: string;

  @Prop({
      type: String,
      required: true,
      validator: (val: string) => val === DialogMode.New || val === DialogMode.Update,
  })
  public DialogMode?: DialogMode;

  @Prop({
    type: String,
    required: false,
  })
  public Isbn?: string;

  @Prop({
    type: String,
    required: false,
  })
  public Title?: string;

  @Prop({
    type: String,
    required: false,
  })
  public Author?: string;

  @Prop({
    type: Number,
    required: false,
  })
  public PageCount?: number;

  @Prop({
    type: String,
    required: false,
  })
  public PurchaseDateString?: string;

  @Prop({
    type: String,
    required: false,
  })
  public Comment?: string;

  // 画面コントロール
  public ComponentIsbn?: string = '';
  public ComponentTitle?: string = '';
  public ComponentAuthor?: string = '';
  public ComponentPageCount?: number = 0;
  public ComponentPurchaseDateString?: string = '';
  public ComponentComment?: string = '';

// 画面制御
  public RegistButtonState: boolean = false;
  public BookInfoButtonState: boolean = false;
  public IsGetBookInfoButtonLoading: boolean = false;
  public IsDatetimePickerEnable: boolean = false;

  public Rules = {
    Required: Rules.RequiredRule,
    Isbn: Rules.Isbn13Rule,
    PageCount: Rules.SimpleNumberRule,
  };

  private ParentDataLoadRequired: boolean = true;

  public beforeUpdate() {

    if ((this.DialogMode && this.DialogMode === DialogMode.Update) && this.ParentDataLoadRequired) {
      this.ComponentIsbn = this.Isbn;
      this.ComponentTitle = this.Title;
      this.ComponentAuthor = this.Author;
      this.ComponentPageCount = this.PageCount;
      this.ComponentPurchaseDateString = this.PurchaseDateString;
      this.ComponentComment = this.Comment;
      this.ParentDataLoadRequired = false;
    }

  }

  /**
   * OnRegistExecuteイベントのエミッタ
   */
  @Emit('OnRegistExecute')
  public EmitRegist(): BookModel {
    const model = new BookModel();

    if (this.ComponentIsbn) {
      model.Isbn = this.ComponentIsbn;
    }

    if (this.ComponentTitle) {
      model.Title = this.ComponentTitle;
    }

    if (this.ComponentAuthor) {
      model.Author = this.ComponentAuthor;
    }

    if (this.ComponentPageCount) {
      model.PageCount = this.ComponentPageCount;
    }

    if (this.ComponentPurchaseDateString) {
      model.PurchaseDate = new Date(this.ComponentPurchaseDateString);
    }

    if (this.ComponentComment) {
      model.Comment = this.ComponentComment;
    }

    this.ParentDataLoadRequired = true;
    return model;
  }

  /**
   * OnCloseExecuteイベントのエミッタ
   */
  @Emit('OnCloseExecute')
  public EmitClose(): void {
    this.ComponentIsbn = '';
    this.ComponentTitle = '';
    this.ComponentAuthor = '';
    this.ComponentPageCount = 0;
    this.ComponentPurchaseDateString = '';
    this.ComponentComment = '';
    this.ParentDataLoadRequired = true;
    return;
  }

/**
 * ISBN検索ボタンの有効設定
 */
private IsSearchButtonEnable(): void {
    if ( this.ComponentIsbn && Rules.Isbn13Rule(this.ComponentIsbn) === true) {
      this.BookInfoButtonState = true;
    } else {
      this.BookInfoButtonState = false;
    }


}

  /**
   * ISBN番号から書誌情報を取得します。
   */
  private async GetBookInfo(): Promise<void> {
    if (!this.ComponentIsbn) {
      return;
    }

    try {
    const content = await Book.SearchBookInfo(this.ComponentIsbn);

    this.Title = content.title;
    this.Author = content.author;
    this.PageCount = content.pageCount;

    } catch (error) {
      const axiousError = error as IAxiousHttpError;
      if (axiousError.response) {
          if (axiousError.response.status !== 404) {
            // 404である場合は警告メッセージ
          }
          throw error;
      }

    }
  }
}
</script>
