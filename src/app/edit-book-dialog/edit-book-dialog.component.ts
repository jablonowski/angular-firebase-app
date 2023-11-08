import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../model/book';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksService } from '../service/books.service';

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.scss']
})
export class EditBookDialogComponent {
  form: FormGroup;

  book: Book;

  constructor(
    private dialogRef: MatDialogRef<EditBookDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) book: Book,
    private booksService: BooksService
  ) {

    this.book = book;

    this.form = this.fb.group({
      description: [book.description, Validators.required],
      title: [book.title, Validators.required],
      author: [book.author, Validators.required]
    });

  }

  close() {
    this.dialogRef.close();
  }

  save() {
    const changes = this.form.value;
    this.booksService.updateBook(this.book.id, changes)
      .subscribe(() => {
        this.dialogRef.close(changes);
      });
  }
}
