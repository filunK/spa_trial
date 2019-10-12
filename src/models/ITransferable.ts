 /**
  * APIModelとModelの間で移行可能なクラスであることを示します。
  *
  * @export
  * @interface ITransferable
  * @template T
  */
export interface ITransferable<T> {

    /**
     * データ移行を行います。
     * 
     * @param {T} copie コピーされるオブジェクトインスタンス
     * 
     * @memberOf ITransferable
     */
    TransferData(copie: T): void;
}
