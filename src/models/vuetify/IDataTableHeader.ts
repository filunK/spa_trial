/**
 * Vuetify DataTableのヘッダインターフェース
 *
 * @export
 * @interface IDataTableHeader
 */
export interface IDataTableHeader {

    /**
     * ヘッダ標題
     * @type {string}
     * @memberOf IDataTableHeader
     */
    text: string;

    /**
     * 対応するデータオブジェクトのプロパティ名
     * @type {string}
     * @memberOf IDataTableHeader
     */
    value: string;

    /**
     * コンテンツのレイアウト
     * @type {('start' | 'center' | 'end')}
     * @memberOf IDataTableHeader
     */
    align?: 'start' | 'center' | 'end';

    /**
     * ソート可能かどうか
     * @type {boolean}
     * @memberOf IDataTableHeader
     */
    sortable?: boolean;

    /**
     * ソート評価式
     * @memberOf IDataTableHeader
     */
    sort?: (a: any, b: any) => number;

    /**
     * フィルタ可能かどうか
     * @type {boolean}
     * @memberOf IDataTableHeader
     */
    filterable?: boolean;

    /**
     * フィルタ評価式
     * @memberOf IDataTableHeader
     */
    filter?: (value: any, search: string, item: any) => boolean;

    /**
     * 適用クラス
     * @type {(string | string[])}
     * @memberOf IDataTableHeader
     */
    class?: string | string[];

    /**
     * コンテンツ幅
     * @type {(string | number)}
     * @memberOf IDataTableHeader
     */
    width?: string | number;

    /**
     * ?
     * @type {boolean}
     * @memberOf IDataTableHeader
     */
    divider?: boolean;

}
