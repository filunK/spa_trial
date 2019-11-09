import Axios, { AxiosRequestConfig } from 'axios';

import {Env} from '@/utils/Env';
import { BookResponseEntity } from '@/models/apiModels/V1/BookResponseEntity';
import { IAxiousHttpError } from '@/exceptions/IAxiousHttpError';
import { Auth } from '@/utils/Auth';


export class Book {


    /**
     * APIサーバの書誌情報検索APIを実行する。
     * @static
     * @param {string} isbn ISBN番号
     * @returns ISBN番号から取得した書誌情報
     * @throws IAxiousHttpError 該当する書誌情報がない場合、IAxiousHttpError.response.status=404となる。それ以外はAPIサーバエラー
     * 
     * @memberOf Book
     */
    public static async SearchBookInfo(isbn: string) {

        // 書籍検索APIのURI
        const searchApi =
            Env.Instance.ApiBaseUri
            + Env.Instance.ApiVersionUri
            + Env.Instance.SearchBookUri
            + '/'
            + isbn;

        try {
            const response = await Axios.get<BookResponseEntity>(searchApi);

            console.log(response);

            return response.data;
        } catch (error) {
            throw error;
        }

    }

    public static async GetBooks(): Promise<BookResponseEntity[]> {

        // 書籍情報取得APIのURI
        const booksApi = Env.Instance.ApiBaseUri + Env.Instance.ApiVersionUri + Env.Instance.GetBooksUri;
        const header = await Auth.CreateBearerHeader();

        try {
            const response = await Axios.get<BookResponseEntity[]>(booksApi, header);

            console.log(response);

            return response.data;
        } catch (error) {

            throw error;
        }

    }
}
