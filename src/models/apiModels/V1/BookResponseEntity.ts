
/**
 * Book APIに対して使用するBookのエンティティ
 * 
 * @export
 * @class BookResponseEntity
 */
export class BookResponseEntity {

    public isbn: string;
    public title: string;
    public author: string;
    public pageCount: number;
    public purchaseDate: Date;
    public comment: string;

    public constructor() {
        this.isbn = '';
        this.title = '';
        this.author = '';
        this.pageCount = 0;
        this.purchaseDate = new Date();
        this.comment = '';
    }
}
