<template>
  <v-card>
    <v-card-title>
     <v-text-field
        v-model="Search"
        append-icon="mdi-table-search"
        label="Search"
        single-line
        hide-details
      />
      <v-dialog v-model="IsDialogShowing" max-width="500px" @click:outside="CloseDialog">
        <template v-slot:activator="{ on }">
          <v-btn small color="primary" dark class="mt-2" v-on="on">新規登録</v-btn>
        </template>
        <BookInfoEditComponent 
          CardTitle="書籍情報" 
          :DialogMode="DialogMode"
          :Isbn="Isbn"
          :Title="Title"
          :Author="Author"
          :PageCount="PageCount"
          :PurchaseDateString="PurchaseDateString"
          :Comment="Comment"
          @OnRegistExecute="RegistBook"
          @OnCloseExecute="CloseDialog"
         />
      </v-dialog>

    </v-card-title>
    <v-data-table
      :headers="Headers"
      :items="Books"
      :search="Search"
      :items-per-page="RecordPerPage"
      :loading="IsTableLoading"
      loading-text="読み込み中です……"
      class="elevation-1"
    >
      <template v-slot:item.Isbn="{ item }">
        <v-label>{{ FormatIsbnString(item.Isbn) }}</v-label>
      </template>
      <template v-slot:item.PurchaseDate="{ item }">
        <v-label>{{ GetDatetimeString(item.PurchaseDate) }}</v-label>
      </template>
      <template v-slot:item.Action="{ item }">
        <v-icon small @click="EditItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="DeleteItem(item)">mdi-delete-forever</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<style lang="scss">

</style>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import 'moment/locale/ja';
import { Env } from '@/utils/Env';
import {Rules} from '@/utils/Rules';

import BookInfoEditComponent from '@/components/BookInfoEditComponent.vue';

import {IDataTableHeader} from '@/models/vuetify/IDataTableHeader';
import { BookModel } from '@/models/BookModel';
import {DialogMode} from '@/models/DialogMode';
import { Book } from '@/utils/Book';

@Component({
  components: {
    BookInfoEditComponent,
  },
})
export default class BookTableComponent extends Vue {

  public readonly Headers: IDataTableHeader[] = [
    {
      text: 'ISBN',
      value: 'Isbn',
    },
    {
      text: '書籍名',
      value: 'Title',
    },
    {
      text: '著者',
      value: 'Author',
    },
    {
      text: 'ページ数',
      value: 'PageCount',
    },
    {
      text: '購入日',
      value: 'PurchaseDate',
    },
    {
      text: 'コメント',
      value: 'Comment',
    },
    {
      text: '操作',
      value: 'Action',
      sortable: false,
    },
   ];

  public Books: BookModel[] = [];
  public Search: string = '';
  public RecordPerPage: number = 5;


  // 画面コントロール
  public IsTableLoading: boolean = false;
  public IsDialogShowing: boolean = false;


  // ダイアログパラメータ
  public DialogMode: DialogMode = DialogMode.New;
  public Isbn: string = '';
  public Title: string = '';
  public Author: string = '';
  public PageCount: number = 0;
  public PurchaseDateString: string = '';
  public Comment: string = '';


  /**
   * mount前処理
   */
  public async created(): Promise<void> {

    this.IsTableLoading = true;

    const books = await Book.GetBooks();

    for (const book of books) {
      const bookModel = new BookModel();
      bookModel.TransferData(book);
      this.Books.push(bookModel);

    }

    this.IsTableLoading = false;
  }


  public EditItem(item: BookModel) {
    this.DialogMode = DialogMode.Update;
    this.Isbn = item.Isbn;
    this.Title = item.Title;
    this.Author = item.Author;
    this.PageCount = item.PageCount;
    this.PurchaseDateString = moment(item.PurchaseDate).format(moment.HTML5_FMT.DATE);
    this.Comment = item.Comment;
    this.IsDialogShowing = true;
  }

  public RegistBook(model: BookModel) {
    if (this.DialogMode === DialogMode.New) {
      console.log('REGIST_BOOK-New');
      console.log(model);
      // TODO 挿入処理
    } else {
      console.log('REGIST_BOOK-Update');
      console.log(model);
      // TODO 更新処理
      
    }
  }

  public CloseDialog() {
    this.DialogMode = DialogMode.New;
    this.Isbn = '';
    this.Title = '';
    this.Author = '';
    this.PageCount = 0;
    this.PurchaseDateString = '';
    this.Comment = '';
    this.IsDialogShowing = false;
  }

  private FormatIsbnString(rawIsbn: string): string {

    const prefix = rawIsbn.substr(0, 3);
    const groupSign = rawIsbn.substr(3, 1);
    const publisherSign = rawIsbn.substr(4, 3);
    const bookSign = rawIsbn.substr(7, 5);
    const checkDigit = rawIsbn.substr(12, 1);

    return prefix + '-' + groupSign + '-' + publisherSign + '-' + bookSign + '-' + checkDigit;
  }

  private GetDatetimeString(datetime: Date): string {

    moment.locale('ja');

    return moment(datetime).format('LL');
  }

}
</script>
