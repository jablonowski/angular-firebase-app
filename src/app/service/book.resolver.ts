import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Book} from "../model/book";
import {BooksService} from "./books.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class BookResolver implements Resolve<Book>{

    constructor(private booksService: BooksService) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {
        const bookId = route.paramMap.get("id");
        return this.booksService.findBookById(bookId);
    }

}