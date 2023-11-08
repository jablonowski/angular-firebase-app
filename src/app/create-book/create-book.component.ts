import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../model/book';
import { BooksService } from '../service/books.service';
import { Router } from '@angular/router';
import {AngularFirestore} from "@angular/fire/compat/firestore"
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookId: Partial<string>;

  form: FormGroup = this.fb.group({
    description: ['', Validators.required],
    author: ['', Validators.required],
    title: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private booksService: BooksService,
    private afs: AngularFirestore,
    private router: Router) {
  }

  ngOnInit() {
    this.bookId = this.afs.createId();
  }

  onCreateBook() {

    const val = this.form.value;

    const newBook: Partial<Book> = {
      description: val.description,
      title: val.title,
      author: val.author
    };

    this.booksService.createBook(newBook, this.bookId)
      .pipe(
        tap(book => {
          console.log("Created new book: ", book);
          this.router.navigateByUrl("/books");
        }),
        catchError(err => {
          console.log(err);
          alert("Could not create the book.");
          return throwError(err);
        })
      )
      .subscribe();

  }

}
