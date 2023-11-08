import { Component } from '@angular/core';
import { Book } from '../model/book';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../service/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  book: any;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService) {
  }

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.booksService.findBookById(bookId).subscribe((snapshot) => {
      this.book = snapshot.data();
    });

  }
}
