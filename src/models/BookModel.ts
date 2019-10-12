import { ITransferable } from '@/models/ITransferable';
import { BookResponseEntity } from '@/models/apiModels/V1/BookResponseEntity';

export class BookModel implements ITransferable<BookResponseEntity> {

    public Isbn: string;
    public Title: string;
    public Author: string;
    public PageCount: number;
    public PurchaseDate: Date;
    public Comment: string;

    constructor() {
        this.Isbn = '';
        this.Title = '';
        this.Author = '';
        this.PageCount = 0;
        this.PurchaseDate = new Date();
        this.Comment = '';
    }


    public TransferData(copie: BookResponseEntity): void {
        this.Isbn = copie.isbn;
        this.Title = copie.title;
        this.Author = copie.author;
        this.PageCount = copie.pageCount;
        this.PurchaseDate = copie.purchaseDate;
        this.Comment = copie.comment;
    }

}
