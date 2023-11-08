import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, concatMap, map, of, from } from "rxjs";
import { Book } from "../model/book";
import { convertSnaps } from "./db-utils";

@Injectable({
  providedIn: "root"
})
export class BooksService {

  constructor(private db: AngularFirestore) {

  }

  createBook(newBook: Partial<Book>, bookId?: string) {
    return this.db.collection("books")
      .get()
      .pipe(
        concatMap(result => {

          const books = convertSnaps<Book>(result);

          let save$: Observable<any>;

          if (bookId) {
            save$ = from(this.db.doc(`books/${bookId}`).set(newBook));
          }
          else {
            save$ = from(this.db.collection("books").add(newBook));
          }

          return save$
            .pipe(
              map(res => {
                return {
                  id: bookId ?? res.id,
                  ...newBook
                }
              })
            );
        })
      )
  }

  deleteBook(bookId: string) {
    return from(this.db.doc(`books/${bookId}`).delete());
  }

  updateBook(bookId: string, changes: Partial<Book>): Observable<any> {
    return from(this.db.doc(`books/${bookId}`).update(changes));
  }

  loadBooks(): Observable<Book[]> {
    return this.db.collection("books")
      .get()
      .pipe(
        map(result => convertSnaps<Book>(result))
      );
  }

  findBookById(bookId: string): Observable<any> {
    return from(this.db.doc(`books/${bookId}`).get());
  }

}