import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { BooksService } from "../service/books.service";
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  allBooks$: Observable<Book[]> | null = null;


  constructor(
    private router: Router,
    private booksService: BooksService,
    public user: UserService) {
  }

  ngOnInit() {
    this.reloadBooks();
  }

  reloadBooks() {
    this.allBooks$ = this.booksService.loadBooks();
  }
}
