import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../model/book';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BooksService } from '../service/books.service';
import { catchError, tap, throwError } from 'rxjs';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-books-card-list',
  templateUrl: './books-card-list.component.html',
  styleUrls: ['./books-card-list.component.scss']
})
export class BooksCardListComponent implements OnInit {

  @Input()
  books: Book[] | null = null;

  @Output()
  bookEdited = new EventEmitter();

  @Output()
  bookDeleted = new EventEmitter<Book>();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private booksService: BooksService,
    public user: UserService) {
  }

  ngOnInit() {

  }

  editBook(book: Book) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "400px";

    dialogConfig.data = book;

    this.dialog.open(EditBookDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
          this.bookEdited.emit();
        }
      });

  }

  onDeleteBook(book: Book) {

    this.booksService.deleteBook(book.id)
      .pipe(
        tap(() => {
          console.log("Deleted book", book);
          this.bookDeleted.emit(book);
        }),
        catchError(err => {
          console.log(err);
          alert("Could not delete book.");
          return throwError(err);
        })
      )
      .subscribe();

  }

}
